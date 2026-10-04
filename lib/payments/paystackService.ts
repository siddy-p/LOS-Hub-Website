import 'server-only';
import crypto from 'crypto';

export interface InitializePaymentParams {
  email: string;
  amountNGN: number;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface InitializePaymentResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET;

/**
 * Initialize a Paystack transaction (amount in NGN is converted to Kobo = NGN * 100)
 */
export async function initializePaystackPayment(
  params: InitializePaymentParams
): Promise<InitializePaymentResult> {
  if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.includes('CHANGE_ME')) {
    // Development / mock fallback
    return {
      authorizationUrl: `/traveler?demo_payment=success&ref=${params.reference}`,
      accessCode: `mock_code_${Date.now()}`,
      reference: params.reference,
    };
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: Math.round(params.amountNGN * 100), // Kobo
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const json = await response.json();
  if (!response.ok || !json.status) {
    throw new Error(json.message || 'Failed to initialize Paystack transaction');
  }

  return {
    authorizationUrl: json.data.authorization_url,
    accessCode: json.data.access_code,
    reference: json.data.reference,
  };
}

/**
 * Verify a transaction with Paystack server-to-server
 */
export async function verifyPaystackPayment(reference: string) {
  if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.includes('CHANGE_ME')) {
    return {
      status: 'success',
      amount: 500000,
      currency: 'NGN',
      reference,
    };
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const json = await response.json();
  if (!response.ok || !json.status) {
    throw new Error(json.message || 'Payment verification failed');
  }

  return json.data;
}

/**
 * Validate Paystack webhook signature HMAC SHA512
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  customSecret?: string
): boolean {
  const secret =
    customSecret || process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return false;

  const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
}
