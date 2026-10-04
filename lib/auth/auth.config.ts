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
      const publicBase = process.env.WEBSITE_HOSTNAME
        ? `https://${process.env.WEBSITE_HOSTNAME}`
        : (process.env.AUTH_URL || process.env.NEXTAUTH_URL || (baseUrl.includes('0.0.0.0') ? 'http://localhost:3000' : baseUrl));

      if (url.startsWith('/')) {
        return `${publicBase}${url}`;
      }

      try {
        const parsed = new URL(url);
        if (
          parsed.hostname === '0.0.0.0' ||
          parsed.hostname === '127.0.0.1' ||
          parsed.hostname === 'localhost'
        ) {
          return `${publicBase}${parsed.pathname}${parsed.search}`;
        }
        return url;
      } catch {
        return `${publicBase}/login`;
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
