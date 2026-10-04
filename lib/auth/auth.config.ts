import type { NextAuthConfig } from 'next-auth';
import type { UserRole } from '@prisma/client';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 hours — operational sessions expire by end of shift
  },
  providers: [],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If already relative, allow it directly
      if (url.startsWith('/') && !url.startsWith('//')) {
        return url;
      }
      try {
        const parsed = new URL(url);
        // If redirect target points to 0.0.0.0, 127.0.0.1 or localhost, convert to clean relative path
        if (
          parsed.hostname === '0.0.0.0' ||
          parsed.hostname === '127.0.0.1' ||
          parsed.hostname === 'localhost'
        ) {
          return parsed.pathname + parsed.search;
        }
        // If baseUrl is also valid and matching origin, allow
        const parsedBase = new URL(baseUrl);
        if (parsedBase.hostname !== '0.0.0.0' && parsed.origin === parsedBase.origin) {
          return url;
        }
        return parsed.pathname + parsed.search;
      } catch {
        return '/login';
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: UserRole }).role;
        token.userId = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
