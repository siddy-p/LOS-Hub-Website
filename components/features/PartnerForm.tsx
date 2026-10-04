'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, Handshake, AlertCircle } from 'lucide-react';

export function PartnerForm() {
  const [partnerType, setPartnerType] = useState<'driver' | 'porter' | 'airline' | 'hotel' | 'lounge' | 'ground_handler'>('driver');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const partnerTypeMap: Record<string, string> = {
      driver: 'TRANSPORT',
      porter: 'OTHER',
      airline: 'AIRLINE',
      hotel: 'HOTEL',
      lounge: 'LOUNGE',
      ground_handler: 'LOGISTICS',
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PARTNER_INQUIRY',
          name: fullName,
          email,
          phone,
          company: fullName,
          message: `Partner application for ${partnerType} category. Contact: ${fullName}, phone: ${phone}, email: ${email}`,
          metadata: { partnerCategory: partnerType, partnerType: partnerTypeMap[partnerType] || 'OTHER' },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to submit partner application. Please try again.');
      }

      setReference(json.data.reference);
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-emerald-200 bg-brand-emerald-50/60 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-emerald-600 text-white">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Partner Application Received</h3>
        <p className="text-xs font-mono text-brand-emerald-800 bg-brand-emerald-100/60 inline-block px-3 py-1 rounded-full">
          Tracking Reference: {reference}
        </p>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you <span className="font-semibold">{fullName}</span>. Our Partner Relations Team will review your application for MM2 Lagos and send onboarding details to <span className="font-semibold">{email}</span>.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit Another Partner Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80">
      <div className="flex items-center gap-2 mb-2">
        <Handshake className="h-5 w-5 text-brand-gold-600" />
        <h3 className="text-lg font-bold text-brand-navy-800">
          Apply to Become an Official Partner
        </h3>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label htmlFor="partner-category" className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Select Partner Category
        </label>
        <select
          id="partner-category"
          name="partnerType"
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value as any)}
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-navy-600 focus:outline-none font-medium"
        >
          <option value="driver">Executive Airport Cab Chauffeur / Fleet</option>
          <option value="porter">Verified Baggage Porter Agent</option>
          <option value="airline">Airline Commercial Partner</option>
          <option value="hotel">Airport Hotel & Transfer Partner</option>
          <option value="lounge">VIP Lounge Operator</option>
          <option value="ground_handler">Ground Handling Company</option>
        </select>
      </div>

      <Input
        id="partner-full-name"
        name="fullName"
        label="Full Name / Company Name"
        autoComplete="name"
        required
        placeholder="e.g. Executive Ride Fleet Ltd / Samuel Okon"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="partner-email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
          placeholder="partners@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="partner-phone"
          name="phone"
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          required
          placeholder="+234 800 000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full justify-center font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting Application...' : 'Submit Partner Application'}
      </Button>
    </form>
  );
}
