import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from '@/lib/auth/auth.config';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const normalizedEmail = email.toLowerCase().trim();
        let user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
            role: true,
            status: true,
          },
        });

        // Auto-bootstrap seed accounts if database was newly deployed without manual seed
        if (!user) {
          const SEED_BOOTSTRAP: Record<string, { name: string; role: any; pass: string }> = {
            'admin@los-hub.com': { name: 'LOS Hub Admin', role: 'SUPER_ADMIN', pass: 'Admin@LosHub2025' },
            'traveler@demo.los-hub.com': { name: 'Dr. Babatunde Lawal', role: 'TRAVELER', pass: 'Traveler@1234' },
            'driver@demo.los-hub.com': { name: 'Samuel Okon', role: 'DRIVER', pass: 'Driver@1234' },
            'porter@demo.los-hub.com': { name: 'Emeka Nnamdi', role: 'PORTER', pass: 'Porter@1234' },
            'corp-admin@demo.los-hub.com': { name: 'Chief Folake Akindele', role: 'CORPORATE_ADMIN', pass: 'Corporate@1234' },
            'airline@demo.los-hub.com': { name: 'Capt. Ibrahim Musa', role: 'AIRLINE_STAFF', pass: 'Airline@1234' },
            'faan@demo.los-hub.com': { name: 'Engr. Donald Oladipo', role: 'FAAN_OPS', pass: 'Faan@1234' },
          };

          const bootstrapUser = SEED_BOOTSTRAP[normalizedEmail];
          if (bootstrapUser && bootstrapUser.pass === password) {
            const hash = await bcrypt.hash(password, 12);
            user = await prisma.user.create({
              data: {
                email: normalizedEmail,
                name: bootstrapUser.name,
                role: bootstrapUser.role,
                status: 'ACTIVE',
                passwordHash: hash,
              },
              select: {
                id: true,
                email: true,
                name: true,
                passwordHash: true,
                role: true,
                status: true,
              },
            });
          }
        }

        if (!user || !user.passwordHash) return null;
        if (user.status !== 'ACTIVE') return null;

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) return null;

        // Update last login timestamp (non-blocking)
        prisma.user
          .update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          })
          .catch(console.error);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
