import { describe, it, expect } from 'vitest';
import { calculatePrice } from '../../lib/services/bookingService';

describe('Server-Authoritative PricingService', () => {
  it('should calculate correct fixed price for MM2 Porter', () => {
    const pricing = calculatePrice('MM2', 'PORTER', 1);
    expect(pricing.basePrice).toBe(5000);
    expect(pricing.discount).toBe(0);
    expect(pricing.total).toBe(5000);
    expect(pricing.currency).toBe('NGN');
  });

  it('should calculate correct fixed price for MM2 Cab', () => {
    const pricing = calculatePrice('MM2', 'CAB', 1);
    expect(pricing.basePrice).toBe(15000);
    expect(pricing.total).toBe(15000);
  });

  it('should scale Lounge price by passenger count', () => {
    const singleGuest = calculatePrice('MM2', 'LOUNGE', 1);
    expect(singleGuest.total).toBe(20000);

    const threeGuests = calculatePrice('MM2', 'LOUNGE', 3);
    expect(threeGuests.total).toBe(60000);
  });

  it('should apply 10% corporate discount for corporate bookings', () => {
    const normal = calculatePrice('MM2', 'CAB', 1, false);
    expect(normal.total).toBe(15000);

    const corporate = calculatePrice('MM2', 'CAB', 1, true);
    expect(corporate.discount).toBe(1500);
    expect(corporate.total).toBe(13500);
  });

  it('should throw an error for unsupported airport codes', () => {
    expect(() => calculatePrice('XYZ_INVALID', 'PORTER', 1)).toThrow(/No pricing configured/);
  });
});
