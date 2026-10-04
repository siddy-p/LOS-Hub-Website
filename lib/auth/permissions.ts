import { UserRole } from '@prisma/client';

// ---------------------------------------------------------------------------
// Permission constants
// ---------------------------------------------------------------------------

export const Permission = {
  // Bookings
  BOOKINGS_READ_OWN: 'bookings:read:own',
  BOOKINGS_READ_ALL: 'bookings:read:all',
  BOOKINGS_CREATE: 'bookings:create',
  BOOKINGS_UPDATE_OWN: 'bookings:update:own',
  BOOKINGS_UPDATE_ALL: 'bookings:update:all',
  BOOKINGS_CANCEL_OWN: 'bookings:cancel:own',
  BOOKINGS_CANCEL_ALL: 'bookings:cancel:all',
  BOOKINGS_ASSIGN: 'bookings:assign',
  BOOKINGS_COMPLETE: 'bookings:complete',

  // Users
  USERS_READ_OWN: 'users:read:own',
  USERS_READ_ALL: 'users:read:all',
  USERS_MANAGE: 'users:manage',

  // Staff
  STAFF_READ: 'staff:read',
  STAFF_ASSIGN: 'staff:assign',
  STAFF_MANAGE: 'staff:manage',

  // Payments
  PAYMENTS_READ_OWN: 'payments:read:own',
  PAYMENTS_READ_ALL: 'payments:read:all',
  PAYMENTS_REFUND: 'payments:refund',

  // Corporate
  CORPORATE_READ_OWN: 'corporate:read:own',
  CORPORATE_MANAGE: 'corporate:manage',

  // Partner
  PARTNER_READ_OWN: 'partner:read:own',
  PARTNER_MANAGE: 'partner:manage',

  // Airline
  AIRLINE_OPS_READ: 'airline:ops:read',

  // FAAN
  FAAN_OPS_READ: 'faan:ops:read',

  // Reports
  REPORTS_READ: 'reports:read',

  // Audit
  AUDIT_READ: 'audit:read',

  // System
  SYSTEM_MANAGE: 'system:manage',
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];

// ---------------------------------------------------------------------------
// Role → Permission mapping (server-side only — NEVER sent to client)
// ---------------------------------------------------------------------------

const ROLE_PERMISSIONS: Record<UserRole, PermissionKey[]> = {
  TRAVELER: [
    Permission.BOOKINGS_READ_OWN,
    Permission.BOOKINGS_CREATE,
    Permission.BOOKINGS_UPDATE_OWN,
    Permission.BOOKINGS_CANCEL_OWN,
    Permission.PAYMENTS_READ_OWN,
    Permission.USERS_READ_OWN,
  ],

  DRIVER: [
    Permission.BOOKINGS_READ_OWN,   // own assigned trips
    Permission.BOOKINGS_COMPLETE,
    Permission.STAFF_READ,
    Permission.USERS_READ_OWN,
  ],

  PORTER: [
    Permission.BOOKINGS_READ_OWN,
    Permission.BOOKINGS_COMPLETE,
    Permission.STAFF_READ,
    Permission.USERS_READ_OWN,
  ],

  PROTOCOL_OFFICER: [
    Permission.BOOKINGS_READ_OWN,
    Permission.BOOKINGS_COMPLETE,
    Permission.STAFF_READ,
    Permission.USERS_READ_OWN,
  ],

  AIRLINE_STAFF: [
    Permission.AIRLINE_OPS_READ,
    Permission.BOOKINGS_READ_ALL, // scoped to airline in service layer
    Permission.USERS_READ_OWN,
  ],

  FAAN_OPS: [
    Permission.FAAN_OPS_READ,
    Permission.BOOKINGS_READ_ALL, // oversight read
    Permission.REPORTS_READ,
    Permission.USERS_READ_OWN,
  ],

  PARTNER: [
    Permission.PARTNER_READ_OWN,
    Permission.BOOKINGS_READ_OWN, // partner-scoped bookings
    Permission.USERS_READ_OWN,
  ],

  CORPORATE_USER: [
    Permission.BOOKINGS_READ_OWN,   // own bookings only
    Permission.BOOKINGS_CREATE,
    Permission.BOOKINGS_CANCEL_OWN,
    Permission.CORPORATE_READ_OWN,
    Permission.PAYMENTS_READ_OWN,
    Permission.USERS_READ_OWN,
  ],

  CORPORATE_ADMIN: [
    Permission.BOOKINGS_READ_OWN,   // org-scoped
    Permission.BOOKINGS_CREATE,
    Permission.BOOKINGS_CANCEL_OWN,
    Permission.CORPORATE_READ_OWN,
    Permission.CORPORATE_MANAGE,
    Permission.PAYMENTS_READ_OWN,
    Permission.USERS_READ_OWN,
    Permission.REPORTS_READ,
  ],

  ADMIN: [
    Permission.BOOKINGS_READ_ALL,
    Permission.BOOKINGS_CREATE,
    Permission.BOOKINGS_UPDATE_ALL,
    Permission.BOOKINGS_CANCEL_ALL,
    Permission.BOOKINGS_ASSIGN,
    Permission.BOOKINGS_COMPLETE,
    Permission.USERS_READ_ALL,
    Permission.STAFF_READ,
    Permission.STAFF_ASSIGN,
    Permission.PAYMENTS_READ_ALL,
    Permission.PAYMENTS_REFUND,
    Permission.CORPORATE_READ_OWN,
    Permission.CORPORATE_MANAGE,
    Permission.PARTNER_READ_OWN,
    Permission.PARTNER_MANAGE,
    Permission.REPORTS_READ,
    Permission.AUDIT_READ,
  ],

  SUPER_ADMIN: Object.values(Permission),
};

// ---------------------------------------------------------------------------
// Helper functions (all server-side)
// ---------------------------------------------------------------------------

/**
 * Check if a role has a given permission.
 * Always call this server-side with the role from the verified session.
 */
export function hasPermission(role: UserRole, permission: PermissionKey): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Get all permissions for a role.
 */
export function getPermissions(role: UserRole): PermissionKey[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

/**
 * Assert a permission — throws an authorized error if not permitted.
 * Use inside API route handlers after session verification.
 */
export function assertPermission(role: UserRole, permission: PermissionKey): void {
  if (!hasPermission(role, permission)) {
    throw new AuthorizationError(
      `Role '${role}' does not have permission '${permission}'`
    );
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

/**
 * Operational roles that have portal access (staff).
 */
export const OPERATIONAL_ROLES: UserRole[] = [
  'DRIVER',
  'PORTER',
  'PROTOCOL_OFFICER',
  'AIRLINE_STAFF',
  'FAAN_OPS',
];

/**
 * Admin roles with admin panel access.
 */
export const ADMIN_ROLES: UserRole[] = ['ADMIN', 'SUPER_ADMIN'];

/**
 * Map of portal route path → minimum required roles.
 * Used by middleware to enforce authentication before route renders.
 */
export const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  '/admin': ['ADMIN', 'SUPER_ADMIN'],
  '/traveler': ['TRAVELER', 'CORPORATE_USER', 'CORPORATE_ADMIN', 'ADMIN', 'SUPER_ADMIN'],
  '/driver': ['DRIVER', 'ADMIN', 'SUPER_ADMIN'],
  '/porter': ['PORTER', 'ADMIN', 'SUPER_ADMIN'],
  '/faan': ['FAAN_OPS', 'ADMIN', 'SUPER_ADMIN'],
  '/airline': ['AIRLINE_STAFF', 'ADMIN', 'SUPER_ADMIN'],
  '/partner': ['PARTNER', 'ADMIN', 'SUPER_ADMIN'],
  '/corporate-portal': ['CORPORATE_USER', 'CORPORATE_ADMIN', 'ADMIN', 'SUPER_ADMIN'],
};
