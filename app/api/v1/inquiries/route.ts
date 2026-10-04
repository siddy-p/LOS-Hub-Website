import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { apiSuccess, apiError, handleApiError } from '@/lib/api/helpers';
import { z } from 'zod';
import { SubmissionType } from '@prisma/client';

export const dynamic = 'force-dynamic';

const inquirySchema = z.object({
  type: z.enum(['CONTACT', 'CORPORATE_INQUIRY', 'PARTNER_INQUIRY']).default('CONTACT'),
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(30).optional(),
  company: z.string().max(200).optional(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(5000),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

function generateInquiryReference(type: SubmissionType): string {
  const prefixMap: Record<SubmissionType, string> = {
    CONTACT: 'CS',
    CORPORATE_INQUIRY: 'CI',
    PARTNER_INQUIRY: 'PI',
  };
  const prefix = prefixMap[type] || 'INQ';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        'VALIDATION_ERROR',
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
        400,
        requestId
      );
    }

    const { type, name, email, phone, company, message, metadata } = parsed.data;

    let reference = generateInquiryReference(type as SubmissionType);
    let attempts = 0;
    while (attempts < 5) {
      const exists = await prisma.contactSubmission.findUnique({ where: { reference } });
      if (!exists) break;
      reference = generateInquiryReference(type as SubmissionType);
      attempts++;
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        type: type as SubmissionType,
        reference,
        name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        company: company || null,
        message,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null,
        status: 'NEW',
      },
    });

    return apiSuccess(
      {
        id: submission.id,
        reference: submission.reference,
        type: submission.type,
        status: submission.status,
        createdAt: submission.createdAt,
      },
      201
    );
  } catch (err) {
    return handleApiError(err, requestId);
  }
}
