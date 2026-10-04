import { describe, it, expect } from 'vitest';
import { hasPermission, Permission, PROTECTED_ROUTES } from '../../lib/auth/permissions';

describe('RBAC & Authorization Matrix', () => {
  it('should grant super admin all permissions', () => {
    expect(hasPermission('SUPER_ADMIN', Permission.BOOKINGS_READ_ALL)).toBe(true);
    expect(hasPermission('SUPER_ADMIN', Permission.USERS_MANAGE)).toBe(true);
    expect(hasPermission('SUPER_ADMIN', Permission.REPORTS_READ)).toBe(true);
  });

  it('should prevent travelers from reading all bookings or assigning staff', () => {
    expect(hasPermission('TRAVELER', Permission.BOOKINGS_READ_ALL)).toBe(false);
    expect(hasPermission('TRAVELER', Permission.BOOKINGS_ASSIGN)).toBe(false);
    expect(hasPermission('TRAVELER', Permission.BOOKINGS_READ_OWN)).toBe(true);
  });

  it('should allow drivers to update assigned trips only', () => {
    expect(hasPermission('DRIVER', Permission.BOOKINGS_COMPLETE)).toBe(true);
    expect(hasPermission('DRIVER', Permission.REPORTS_READ)).toBe(false);
  });

  it('should protect routes according to matrix', () => {
    expect(PROTECTED_ROUTES['/admin']).toContain('SUPER_ADMIN');
    expect(PROTECTED_ROUTES['/admin']).not.toContain('TRAVELER');
    expect(PROTECTED_ROUTES['/driver']).toContain('DRIVER');
    expect(PROTECTED_ROUTES['/porter']).toContain('PORTER');
  });
});
