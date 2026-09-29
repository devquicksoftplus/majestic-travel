import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { Tour } from '@/types';

const PROJECT_ID =
  process.env.FIREBASE_ADMIN_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  'majestic-travels-ece82';

export const AUTHORIZED_ADMIN_EMAIL =
  process.env.ADMIN_AUTHORIZED_EMAIL || 'ssfoods.erode@gmail.com';

// Global cache to guarantee singleton instance across Next.js HMR and serverless warm starts
declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdminApp: App | undefined;
  // eslint-disable-next-line no-var
  var __firebaseAdminAuth: Auth | undefined;
  // eslint-disable-next-line no-var
  var __firebaseAdminDb: Firestore | undefined;
}

export function getAdminApp(): App {
  if (globalThis.__firebaseAdminApp) {
    return globalThis.__firebaseAdminApp;
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    globalThis.__firebaseAdminApp = existingApps[0]!;
    return globalThis.__firebaseAdminApp;
  }

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (clientEmail && privateKey) {
    globalThis.__firebaseAdminApp = initializeApp({
      credential: cert({
        projectId: PROJECT_ID,
        clientEmail,
        privateKey,
      }),
      projectId: PROJECT_ID,
    });
  } else {
    // Project ID initialization for standard token verification
    globalThis.__firebaseAdminApp = initializeApp({
      projectId: PROJECT_ID,
    });
  }

  return globalThis.__firebaseAdminApp;
}

export function getAdminAuth(): Auth {
  if (!globalThis.__firebaseAdminAuth) {
    const app = getAdminApp();
    globalThis.__firebaseAdminAuth = getAuth(app);
  }
  return globalThis.__firebaseAdminAuth;
}

export function getAdminFirestore(): Firestore | null {
  if (globalThis.__firebaseAdminDb) {
    return globalThis.__firebaseAdminDb;
  }
  try {
    const app = getAdminApp();
    globalThis.__firebaseAdminDb = getFirestore(app);
    return globalThis.__firebaseAdminDb;
  } catch (err) {
    console.warn('[firebaseAdmin] Firestore admin initialization warning:', err);
    return null;
  }
}

// Transparent Proxy ensures single initialization only when accessed, maintaining 100% backward compatibility
export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_target, prop: string | symbol) {
    const auth = getAdminAuth();
    const value = Reflect.get(auth, prop);
    return typeof value === 'function' ? value.bind(auth) : value;
  },
});

/**
 * Persists a Tour document to Cloud Firestore.
 * Attempts Firebase Admin SDK first; falls back to Firestore REST API with the admin user ID token.
 */
export async function syncTourToFirestore(tour: Tour, idToken?: string): Promise<{ success: boolean; error?: string }> {
  // 1. Attempt Admin SDK write
  try {
    const db = getAdminFirestore();
    if (db) {
      const cleanData = JSON.parse(JSON.stringify(tour));
      await db.collection('tours').doc(tour.id).set(cleanData, { merge: true });
      console.log(`[Firestore Admin] Saved tour doc: tours/${tour.id}`);
      return { success: true };
    }
  } catch (adminErr: unknown) {
    const errMsg = adminErr instanceof Error ? adminErr.message : String(adminErr);
    console.warn(`[Firestore Admin] Admin SDK write skipped/failed: ${errMsg}`);
  }

  // 2. Attempt Firestore REST API with user's verified idToken if present
  if (idToken) {
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/tours/${tour.id}`;
      const fields: Record<string, Record<string, unknown>> = {};
      for (const [key, value] of Object.entries(tour)) {
        if (value === undefined || value === null) continue;
        if (typeof value === 'string') fields[key] = { stringValue: value };
        else if (typeof value === 'boolean') fields[key] = { booleanValue: value };
        else if (typeof value === 'number') fields[key] = { integerValue: String(value) };
        else if (Array.isArray(value)) {
          fields[key] = {
            arrayValue: {
              values: value.map((v) =>
                typeof v === 'string' ? { stringValue: v } : { mapValue: { fields: {} } }
              ),
            },
          };
        }
      }

      const res = await fetch(restUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ fields }),
      });

      if (res.ok) {
        console.log(`[Firestore REST] Synced tour doc via REST: tours/${tour.id}`);
        return { success: true };
      }
    } catch (restErr) {
      console.warn('[Firestore REST] Error during REST sync fallback:', restErr);
    }
  }

  return { success: false, error: 'Could not write to Firestore directly' };
}

/**
 * Removes a Tour document from Cloud Firestore.
 */
export async function deleteTourFromFirestore(tourId: string, idToken?: string): Promise<boolean> {
  try {
    const db = getAdminFirestore();
    if (db) {
      await db.collection('tours').doc(tourId).delete();
      console.log(`[Firestore Admin] Deleted tour doc: tours/${tourId}`);
      return true;
    }
  } catch (err) {
    console.warn('[Firestore Admin] Delete warning:', err);
  }

  if (idToken) {
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/tours/${tourId}`;
      const res = await fetch(restUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        console.log(`[Firestore REST] Deleted tour doc via REST: tours/${tourId}`);
        return true;
      }
    } catch (err) {
      console.warn('[Firestore REST] REST delete error:', err);
    }
  }

  return false;
}

/**
 * Parses raw Firestore REST API field values into plain JavaScript objects.
 */
function parseFirestoreRestFields(fields: Record<string, Record<string, unknown>>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(fields)) {
    if ('stringValue' in val) result[key] = val.stringValue;
    else if ('booleanValue' in val) result[key] = val.booleanValue;
    else if ('integerValue' in val) result[key] = Number(val.integerValue);
    else if ('doubleValue' in val) result[key] = Number(val.doubleValue);
    else if ('arrayValue' in val && typeof val.arrayValue === 'object' && val.arrayValue !== null) {
      const arrVal = val.arrayValue as { values?: Array<Record<string, unknown>> };
      result[key] = (arrVal.values || []).map((item) => {
        if ('stringValue' in item) return item.stringValue;
        if ('mapValue' in item && typeof item.mapValue === 'object' && item.mapValue !== null) {
          const mapVal = item.mapValue as { fields?: Record<string, Record<string, unknown>> };
          return parseFirestoreRestFields(mapVal.fields || {});
        }
        return Object.values(item)[0];
      });
    } else if ('mapValue' in val && typeof val.mapValue === 'object' && val.mapValue !== null) {
      const mapVal = val.mapValue as { fields?: Record<string, Record<string, unknown>> };
      result[key] = parseFirestoreRestFields(mapVal.fields || {});
    } else if ('nullValue' in val) {
      result[key] = null;
    }
  }
  return result;
}

/**
 * Reads all Tour documents directly from Cloud Firestore.
 * Tries Admin SDK first; falls back to Firestore REST API.
 */
export async function getToursFromFirestore(): Promise<Tour[] | null> {
  // 1. Try Firebase Admin SDK
  try {
    const db = getAdminFirestore();
    if (db) {
      const snap = await db.collection('tours').get();
      if (!snap.empty) {
        const tours = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Tour, 'id'>),
        })) as Tour[];
        console.log(`[Firestore Admin] Loaded ${tours.length} tours from Firestore.`);
        return tours;
      }
    }
  } catch (adminErr) {
    console.warn('[Firestore Admin] Read via Admin SDK warning:', adminErr);
  }

  // 2. Try Firestore REST API
  try {
    const restUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/tours`;
    const res = await fetch(restUrl, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.documents && Array.isArray(data.documents) && data.documents.length > 0) {
        const tours = data.documents.map((doc: { name: string; fields?: Record<string, Record<string, unknown>> }) => {
          const id = doc.name.split('/').pop()!;
          const fields = parseFirestoreRestFields(doc.fields || {});
          return { id, ...fields } as Tour;
        });
        console.log(`[Firestore REST] Loaded ${tours.length} tours via REST API.`);
        return tours;
      }
    }
  } catch (restErr) {
    console.warn('[Firestore REST] Read via REST warning:', restErr);
  }

  return null;
}

/**
 * Reads a single Tour document by ID directly from Cloud Firestore.
 */
export async function getTourByIdFromFirestore(id: string): Promise<Tour | null> {
  try {
    const db = getAdminFirestore();
    if (db) {
      const doc = await db.collection('tours').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...(doc.data() as Omit<Tour, 'id'>) } as Tour;
      }
    }
  } catch (err) {
    console.warn(`[Firestore Admin] getTourById warning for ${id}:`, err);
  }

  try {
    const restUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/tours/${id}`;
    const res = await fetch(restUrl, { cache: 'no-store' });
    if (res.ok) {
      const doc = await res.json();
      const fields = parseFirestoreRestFields(doc.fields || {});
      return { id, ...fields } as Tour;
    }
  } catch (err) {
    console.warn(`[Firestore REST] getTourById warning for ${id}:`, err);
  }

  return null;
}


