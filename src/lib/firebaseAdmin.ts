import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';

const PROJECT_ID =
  process.env.FIREBASE_ADMIN_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  'majestic-travels-ece82';

export const AUTHORIZED_ADMIN_EMAIL =
  process.env.ADMIN_AUTHORIZED_EMAIL || 'ssfoods.erode@gmail.com';

function initializeAdminApp(): App {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId: PROJECT_ID,
        clientEmail,
        privateKey,
      }),
      projectId: PROJECT_ID,
    });
  }

  // Project ID initialization for standard token verification
  return initializeApp({
    projectId: PROJECT_ID,
  });
}

const adminApp = initializeAdminApp();
export const adminAuth: Auth = getAuth(adminApp);
