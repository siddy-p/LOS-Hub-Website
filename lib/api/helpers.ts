import 'server-only';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { hasPermission, AuthorizationError, type PermissionKey } from '@/lib/auth/permissions';
import { UserRole } from '@prisma/client';

export interface AuthenticatedContext {
  userId: string;
  role: UserRole;
  email: string;
}

/**
 * Get the current authenticated session context for use inside API route handlers.
 * Returns the authenticated user context or throws/returns null.
 *
 * Usage:
 *   const ctx = await requireAuth();
 *   assertPermission(ctx.role, Permission.BOOKINGS_CREATE);
 */
export async function requireAuth(): Promise<AuthenticatedContext> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthenticatedError('Authentication required');
  }

  return {
    userId: session.user.id,
    role: session.user.role as UserRole,
    email: session.user.email!,
  };
}

/**
 * Require auth + specific permission in one call.
 * Throws UnauthenticatedError or AuthorizationError on failure.
 */
export async function requirePermission(permission: PermissionKey): Promise<AuthenticatedContext> {
  const ctx = await requireAuth();

  if (!hasPermission(ctx.role, permission)) {
    throw new AuthorizationError(
      `Role '${ctx.role}' is not permitted to perform '${permission}'`
    );
  }

  return ctx;
}

export class UnauthenticatedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthenticatedError';
  }
}

// ---------------------------------------------------------------------------
// Standard API response helpers
// ---------------------------------------------------------------------------

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  code: string,
  message: string,
  status: number,
  requestId?: string
) {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, ...(requestId ? { requestId } : {}) },
    },
    { status }
  );
}

/**
 * Handle common API errors consistently.
 * Call inside catch blocks in API route handlers.
 */
export function handleApiError(err: unknown, requestId?: string): NextResponse {
  if (err instanceof UnauthenticatedError) {
    return apiError('UNAUTHENTICATED', 'Authentication required', 401, requestId);
  }

  if (err instanceof AuthorizationError) {
    return apiError('FORBIDDEN', 'You do not have permission to perform this action', 403, requestId);
  }

  // Do NOT leak internal error details
  console.error('[API Error]', err);
  return apiError('INTERNAL_ERROR', 'An unexpected error occurred', 500, requestId);
}
