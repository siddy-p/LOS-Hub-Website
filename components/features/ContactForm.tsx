'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, Mail } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
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
        <h3 className="text-xl font-bold text-slate-900">Message Sent Successfully</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you <span className="font-semibold">{name}</span>. Our MM2 Airport Support Desk has received your message and will respond to <span className="font-semibold">{email}</span> promptly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-brand-gold-600" />
        <h3 className="text-lg font-bold text-brand-navy-800">
          Send Us a Direct Message
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="contact-full-name"
          name="name"
          label="Your Full Name"
          autoComplete="name"
          required
          placeholder="e.g. Amina Mohammed"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="contact-email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
          placeholder="amina@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Input
        id="contact-subject"
        name="subject"
        label="Subject"
        required
        placeholder="e.g. Booking Assistance / Media Inquiry / Partnership"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="How can our MM2 airport team assist you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-navy-600 focus:outline-none"
        />
      </div>

      <Button variant="gold" size="lg" className="w-full justify-center font-bold">
        Send Message to Support Desk
      </Button>
    </form>
  );
}
