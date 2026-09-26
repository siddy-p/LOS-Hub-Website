'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, Building2 } from 'lucide-react';

export function CorporateForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('51-200');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-emerald-200 bg-brand-emerald-50/60 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-emerald-600 text-white">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Enterprise Inquiry Received</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you <span className="font-semibold">{contactName}</span>. Our Enterprise Travel Director will contact you at <span className="font-semibold">{workEmail}</span> within 4 business hours to set up your corporate portal and monthly invoicing.
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

      <Button variant="gold" size="lg" className="w-full justify-center font-bold">
        Connect With Enterprise Sales
      </Button>
    </form>
  );
}
