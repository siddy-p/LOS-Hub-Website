import React from 'react';
import { Container } from '@/components/layout/Container';
import { PartnerForm } from '@/components/features/PartnerForm';
import { Handshake, Car, Luggage, Building, Plane } from 'lucide-react';

export const metadata = {
  title: 'Partner Portal Application — LOS Hub',
  description: 'Join LOS Hub as an official verified driver, porter agent, airline partner, hotel, or lounge operator.',
};

export default function PartnersPage() {
  return (
    <div className="py-12 space-y-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 flex items-center gap-1.5">
              <Handshake className="h-4 w-4" />
              Partner Network
            </span>
            <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight leading-tight">
              Grow Your Business as an Official LOS Hub Partner.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              We connect airport drivers, baggage porters, lounges, airlines, and hotels to thousands of verified executive travelers every month at MM2 Lagos.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Car className="h-5 w-5 text-brand-gold-600 mb-2" />
                <h3 className="text-sm font-bold text-slate-900">Drivers & Fleets</h3>
                <p className="text-xs text-slate-500 mt-1">Guaranteed fixed fares with zero street haggling.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Luggage className="h-5 w-5 text-brand-emerald-600 mb-2" />
                <h3 className="text-sm font-bold text-slate-900">Verified Porters</h3>
                <p className="text-xs text-slate-500 mt-1">Official FAAN-backed uniform & digital ID badges.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Building className="h-5 w-5 text-indigo-600 mb-2" />
                <h3 className="text-sm font-bold text-slate-900">Hotels & Lounges</h3>
                <p className="text-xs text-slate-500 mt-1">Fill empty lounge seats and hotel day-rooms.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <Plane className="h-5 w-5 text-red-600 mb-2" />
                <h3 className="text-sm font-bold text-slate-900">Airlines</h3>
                <p className="text-xs text-slate-500 mt-1">Elevate ground experience for premium passengers.</p>
              </div>
            </div>
          </div>

          <div>
            <PartnerForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
