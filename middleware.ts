import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/auth.config';

const { auth } = NextAuth(authConfig);
import { PROTECTED_ROUTES } from '@/lib/auth/permissions';
import type { UserRole } from '@prisma/client';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // -------------------------------------------------------------------------
  // 1. Security headers — applied to every response
  // -------------------------------------------------------------------------
  const response = NextResponse.next();

  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
    "script-src-elem 'self' 'unsafe-inline' blob: https:",
    "worker-src 'self' blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' blob: data: https://images.unsplash.com https://*.blob.core.windows.net https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' ws: wss: https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspHeader);

  // -------------------------------------------------------------------------
  // 2. Portal route protection
  // -------------------------------------------------------------------------
  const protectedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );

  if (protectedRoute) {
    const session = await auth();

    if (!session?.user) {
      // Not authenticated — redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = session.user.role as UserRole;
    const allowedRoles = PROTECTED_ROUTES[protectedRoute];

    if (!allowedRoles.includes(userRole)) {
      // Authenticated but wrong role — redirect to their own portal
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // -------------------------------------------------------------------------
  // 3. Prevent search engine indexing of portals
  // -------------------------------------------------------------------------
  const portalPaths = ['/admin', '/traveler', '/driver', '/porter', '/faan', '/airline', '/partner', '/corporate-portal'];
  if (portalPaths.some((p) => pathname.startsWith(p))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|robots.txt|sitemap.xml).*)',
  ],
};
