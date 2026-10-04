'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, Building2, AlertCircle } from 'lucide-react';

export function CorporateForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('51-200');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'CORPORATE_INQUIRY',
          name: contactName,
          email: workEmail,
          phone,
          company: companyName,
          message: `Enterprise inquiry for ${companyName} (${companySize} employees). Contact: ${contactName}, ${phone}`,
          metadata: { companySize },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to submit inquiry. Please try again.');
      }

      setReference(json.data.reference);
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting your request.');
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
        <h3 className="text-xl font-bold text-slate-900">Enterprise Inquiry Received</h3>
        <p className="text-xs font-mono text-brand-emerald-800 bg-brand-emerald-100/60 inline-block px-3 py-1 rounded-full">
          Tracking Reference: {reference}
        </p>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you <span className="font-semibold">{contactName}</span>. Our Enterprise Travel Director will contact you at <span className="font-semibold">{workEmail}</span> within 4 business hours to set up your corporate portal and monthly invoicing for <span className="font-semibold">{companyName}</span>.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80">
      <div className="flex items-center gap-2 mb-2">
        <Building2 className="h-5 w-5 text-brand-gold-600" />
        <h3 className="text-lg font-bold text-brand-navy-800">
          Request Enterprise Travel Account
        </h3>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="corp-company-name"
          name="companyName"
          label="Company Name"
          autoComplete="organization"
          required
          placeholder="e.g. Chevron Nigeria / Guaranty Trust"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          id="corp-contact-name"
          name="contactName"
          label="Contact Person Name"
          autoComplete="name"
          required
          placeholder="e.g. Executive Assistant / Travel Mgr"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="corp-work-email"
          name="workEmail"
          label="Work Email Address"
          type="email"
          autoComplete="email"
          required
          placeholder="travel@company.com"
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
        />
        <Input
          id="corp-phone"
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

      <div>
        <label htmlFor="corp-company-size" className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Company Size (Employees)
        </label>
        <select
          id="corp-company-size"
          name="companySize"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-navy-600 focus:outline-none"
        >
          <option value="1-10">1-10 Employees</option>
          <option value="11-50">11-50 Employees</option>
          <option value="51-200">51-200 Employees</option>
          <option value="201-1000">201-1000 Employees</option>
          <option value="1000+">1000+ Enterprise Employees</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full justify-center font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting Request...' : 'Connect With Enterprise Sales'}
      </Button>
    </form>
  );
}
