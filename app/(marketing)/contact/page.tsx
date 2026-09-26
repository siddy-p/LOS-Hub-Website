import React from 'react';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/features/ContactForm';
import { siteConfig } from '@/lib/config/site.config';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — LOS Hub Support Desk',
  description: 'Contact LOS Hub support desk at MM2 Terminal, Lagos, Nigeria.',
};

export default function ContactPage() {
  return (
    <div className="py-12 space-y-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
              Airport Support Desk
            </span>
            <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight leading-tight">
              We're Here at MM2 Lagos.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Have questions about your upcoming airport booking, executive ride, or corporate portal? Contact our dedicated airport desk.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <MapPin className="h-5 w-5 text-brand-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">MM2 Airport Office</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{siteConfig.contacts.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Phone className="h-5 w-5 text-brand-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Support Telephone</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{siteConfig.contacts.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Mail className="h-5 w-5 text-brand-navy-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email Enquiries</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{siteConfig.contacts.email}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder Frame */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Terminal Map Placeholder
              </div>
              <div className="text-sm font-semibold text-brand-navy-800">
                Murtala Muhammed Airport Terminal 2 (MM2) — Ikeja, Lagos
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
