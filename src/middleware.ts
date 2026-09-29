import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('majestic_admin_session')?.value;

  // Protected admin routes — all /admin/* except /admin/login
  const isProtectedAdminRoute =
    pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  // Unauthenticated visitor trying to access protected admin pages
  if (isProtectedAdminRoute && !sessionCookie) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Note: /admin/login route handler/page will perform cryptographic verification of the session
  // and redirect to /admin only if the session is genuinely valid and authorized.
  // We do NOT redirect in middleware here based purely on cookie presence, which causes
  // ERR_TOO_MANY_REDIRECTS loops when the cookie is expired or invalid.

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
