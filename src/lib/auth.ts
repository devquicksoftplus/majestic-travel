import { cookies } from 'next/headers';
import { adminAuth, AUTHORIZED_ADMIN_EMAIL } from './firebaseAdmin';

export const COOKIE_NAME = 'majestic_admin_session';

// Session duration: 5 days (in milliseconds)
const SESSION_EXPIRATION_MS = 60 * 60 * 24 * 5 * 1000;
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 5;

export interface AdminSession {
  email: string;
  uid: string;
}

/**
 * Verifies a client-provided Firebase ID token on the server using Firebase Admin SDK,
 * enforces that the email strictly matches ssfoods.erode@gmail.com,
 * and sets an HTTP-only secure session cookie.
 */
export async function createAdminSession(idToken: string): Promise<AdminSession> {
  if (!idToken) {
    throw new Error('Missing ID token');
  }

  const hasServiceAccount = Boolean(
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );

  // 1. Verify ID token with Firebase Admin SDK (checkRevoked requires service account credentials)
  const decodedToken = await adminAuth.verifyIdToken(idToken, hasServiceAccount);

  // 2. Strict Admin Authorization Check
  const tokenEmail = decodedToken.email?.toLowerCase();
  if (tokenEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
    throw new Error('Unauthorized: This account does not have admin privileges.');
  }

  let cookieValue = idToken;

  // 3. Attempt to create a standard Firebase session cookie if service account credentials are available
  if (hasServiceAccount) {
    try {
      cookieValue = await adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRATION_MS,
      });
    } catch {
      cookieValue = idToken;
    }
  }

  // 4. Set secure HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRATION_SECONDS,
    path: '/',
  });

  return {
    email: decodedToken.email!,
    uid: decodedToken.uid,
  };
}

/**
 * Retrieves and cryptographically verifies the current Firebase session cookie on the server.
 * Returns the verified admin session if valid and authorized, or null otherwise.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    let decoded: { email?: string; uid: string } | null = null;

    const hasServiceAccount = Boolean(
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY
    );

    // Try verifying as Firebase session cookie first if service account is available
    if (hasServiceAccount) {
      try {
        decoded = await adminAuth.verifySessionCookie(token, true);
      } catch {
        try {
          decoded = await adminAuth.verifyIdToken(token, true);
        } catch {
          return null;
        }
      }
    } else {
      // Otherwise verify as Firebase ID token without checkRevoked requirement
      try {
        decoded = await adminAuth.verifyIdToken(token, false);
      } catch {
        return null;
      }
    }

    if (!decoded || !decoded.email) {
      cookieStore.delete(COOKIE_NAME);
      return null;
    }

    // Verify authorized admin identity
    if (decoded.email.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      cookieStore.delete(COOKIE_NAME);
      return null;
    }

    return {
      email: decoded.email,
      uid: decoded.uid,
    };
  } catch {
    try {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
    } catch {
      // Ignore if headers already sent
    }
    return null;
  }
}

/**
 * Clears the HTTP-only Firebase session cookie upon logout.
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
