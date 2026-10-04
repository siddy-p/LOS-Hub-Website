import { z } from 'zod';

// ---------------------------------------------------------------------------
// Booking validation schemas — used both server-side and for client-side hints
// ---------------------------------------------------------------------------

export const bookingCreateSchema = z.object({
  airportCode: z.string().min(2).max(10).toUpperCase(),
  terminalCode: z.string().optional(),
  serviceType: z.enum(['PORTER', 'CAB', 'LOUNGE', 'FASTTRACK']),
  flightNumber: z.string().max(20).optional(),
  flightDirection: z.enum(['ARRIVAL', 'DEPARTURE']).default('ARRIVAL'),
  scheduledAt: z.string().min(5), // ISO 8601 string or parseable date
  passengerCount: z.number().int().min(1).max(20).default(1),
  luggageCount: z.number().int().min(0).max(30).default(0),
  specialRequests: z.string().max(500).optional(),
  idempotencyKey: z.string().optional(),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
});

export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;

// ---------------------------------------------------------------------------
// Contact/Lead submission schemas
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
});

export const corporateInquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  company: z.string().min(2).max(200),
  industry: z.string().max(100).optional(),
  teamSize: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export const partnerInquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  company: z.string().min(2).max(200),
  partnerType: z.enum(['AIRLINE', 'HOTEL', 'LOUNGE', 'LOGISTICS', 'TRANSPORT', 'OTHER']),
  message: z.string().min(10).max(2000),
});

// ---------------------------------------------------------------------------
// Auth schemas
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and a number'
    ),
});

// ---------------------------------------------------------------------------
// Environment variable validation — runs at server startup
// ---------------------------------------------------------------------------

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export function validateServerEnv() {
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(
      `❌ Server environment validation failed. Fix these before starting:\n${missing}`
    );
  }
  return result.data;
}
