import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { verifyWebhookSignature } from '../../lib/payments/paystackService';

describe('Payment & Webhook Security', () => {
  it('should verify valid HMAC SHA512 signature', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'LOB-123456' } });
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY || 'test_secret';

    process.env.PAYSTACK_WEBHOOK_SECRET = 'test_secret';
    const validSignature = crypto.createHmac('sha512', 'test_secret').update(payload).digest('hex');

    expect(verifyWebhookSignature(payload, validSignature)).toBe(true);
  });

  it('should reject invalid HMAC signature', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'LOB-123456' } });
    process.env.PAYSTACK_WEBHOOK_SECRET = 'test_secret';

    expect(verifyWebhookSignature(payload, 'forged_signature_12345')).toBe(false);
  });
});
