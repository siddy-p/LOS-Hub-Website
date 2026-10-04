import { describe, it, expect } from 'vitest';
import { canTransition } from '../../lib/services/bookingService';

describe('Booking State Machine', () => {
  it('should allow valid happy-path state transitions', () => {
    expect(canTransition('PENDING_PAYMENT', 'PAID')).toBe(true);
    expect(canTransition('PAID', 'CONFIRMED')).toBe(true);
    expect(canTransition('CONFIRMED', 'ASSIGNMENT_PENDING')).toBe(true);
    expect(canTransition('ASSIGNMENT_PENDING', 'ASSIGNED')).toBe(true);
    expect(canTransition('ASSIGNED', 'IN_PROGRESS')).toBe(true);
    expect(canTransition('IN_PROGRESS', 'COMPLETED')).toBe(true);
  });

  it('should allow cancellation from active stages', () => {
    expect(canTransition('PENDING_PAYMENT', 'CANCELLED')).toBe(true);
    expect(canTransition('CONFIRMED', 'CANCELLED')).toBe(true);
    expect(canTransition('ASSIGNED', 'CANCELLED')).toBe(true);
  });

  it('should reject invalid or backward state transitions', () => {
    expect(canTransition('COMPLETED', 'PENDING_PAYMENT')).toBe(false);
    expect(canTransition('COMPLETED', 'CANCELLED')).toBe(false);
    expect(canTransition('PENDING_PAYMENT', 'COMPLETED')).toBe(false);
    expect(canTransition('CANCELLED', 'ASSIGNED')).toBe(false);
  });

  it('should allow refund transitions from cancelled', () => {
    expect(canTransition('CANCELLED', 'REFUND_PENDING')).toBe(true);
    expect(canTransition('REFUND_PENDING', 'REFUNDED')).toBe(true);
  });
});
