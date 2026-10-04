import 'server-only';
import { EmailClient } from '@azure/communication-email';

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface SendEmailOptions {
  to: EmailRecipient[];
  subject: string;
  html: string;
  plainText?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const ACS_CONNECTION_STRING = process.env.ACS_CONNECTION_STRING;
const ACS_SENDER_ADDRESS = process.env.ACS_SENDER_ADDRESS || 'noreply@los-hub.com';

let emailClient: EmailClient | null = null;

function getEmailClient(): EmailClient | null {
  if (!ACS_CONNECTION_STRING || ACS_CONNECTION_STRING.includes('CHANGE_ME')) {
    return null;
  }
  if (!emailClient) {
    emailClient = new EmailClient(ACS_CONNECTION_STRING);
  }
  return emailClient;
}

/**
 * Authoritative email sender for LOS Hub via Azure Communication Services.
 * Gracefully falls back to structured logging in development or when ACS is not configured.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const client = getEmailClient();

  if (!client) {
    console.log('📧 [MOCK EMAIL SERVICE] Sending email:', {
      from: ACS_SENDER_ADDRESS,
      to: options.to.map((r) => r.email).join(', '),
      subject: options.subject,
      preview: options.plainText || options.html.slice(0, 100),
    });
    return {
      success: true,
      messageId: `mock-acs-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };
  }

  try {
    const poller = await client.beginSend({
      senderAddress: ACS_SENDER_ADDRESS,
      content: {
        subject: options.subject,
        html: options.html,
        plainText: options.plainText || options.subject,
      },
      recipients: {
        to: options.to.map((r) => ({
          address: r.email,
          displayName: r.name,
        })),
      },
    });

    const result = await poller.pollUntilDone();
    return {
      success: true,
      messageId: result.id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('❌ [ACS EMAIL ERROR] Failed to dispatch email:', errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

/**
 * Send branded booking confirmation email
 */
export async function sendBookingConfirmationEmail(params: {
  toEmail: string;
  toName: string;
  reference: string;
  airportCode: string;
  serviceType: string;
  scheduledAt: Date;
  totalPriceNGN: number;
}) {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(params.totalPriceNGN);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Lagos',
  }).format(new Date(params.scheduledAt));

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #0b192c; padding: 32px; text-align: center; }
          .header h1 { color: #d4af37; margin: 0; font-size: 24px; letter-spacing: 0.05em; }
          .header p { color: #94a3b8; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; }
          .content { padding: 32px; }
          .ref-badge { display: inline-block; background: #fef9c3; color: #854d0e; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 14px; margin-bottom: 16px; border: 1px solid #fde047; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .row:last-child { border-bottom: none; font-weight: bold; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LOS HUB</h1>
            <p>Verified Airport Experience</p>
          </div>
          <div class="content">
            <span class="ref-badge">Reference: ${params.reference}</span>
            <h2 style="margin-top: 0; color: #0b192c;">Your Airport Booking is Registered</h2>
            <p>Dear ${params.toName},</p>
            <p>Your booking for verified airport concierge services at <strong>${params.airportCode}</strong> has been secured.</p>
            
            <div class="card">
              <div class="row"><span>Service:</span><span>${params.serviceType}</span></div>
              <div class="row"><span>Airport:</span><span>${params.airportCode} Terminal</span></div>
              <div class="row"><span>Schedule:</span><span>${formattedDate}</span></div>
              <div class="row"><span>Total Price:</span><span style="color: #b45309;">${formattedPrice}</span></div>
            </div>

            <p style="font-size: 14px; color: #475569;">
              A verified LOS Hub operational officer will be stationed to receive and coordinate your journey.
            </p>
          </div>
          <div class="footer">
            LOS Hub Operational Concierge • MM2 Terminal, Ikeja, Lagos, Nigeria<br>
            Official Support: support@los-hub.com • https://los-hub.com
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: [{ email: params.toEmail, name: params.toName }],
    subject: `[LOS Hub] Booking Registered — ${params.reference}`,
    html,
    plainText: `LOS Hub Booking Registered: Reference ${params.reference}. Service: ${params.serviceType} at ${params.airportCode}. Date: ${formattedDate}. Price: ${formattedPrice}.`,
  });
}
