'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ServiceCard } from '@/components/features/ServiceCard';
import { StatsSection } from '@/components/features/StatsSection';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { LAUNCH_SERVICES } from '@/lib/data/services';
import { siteConfig } from '@/lib/config/site.config';
import { useAirport } from '@/hooks/useAirport';
import { BookingModal } from '@/components/features/BookingModal';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Plane,
  Building2,
  Car,
  Luggage,
  Sparkles,
  Smartphone,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import { ServiceType } from '@/types/airport';

export default function HomePage() {
  const { currentAirport, selectAirport } = useAirport('MM2');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('porter');

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId && (serviceId === 'porter' || serviceId === 'cab' || serviceId === 'lounge')) {
      setSelectedServiceId(serviceId as ServiceType);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-gold-500/10 via-brand-navy-800/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Launch Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/30 bg-white/90 px-4 py-1.5 shadow-subtle backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-brand-navy-800">
                Live at MM2 Lagos
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-600">
                Expanding Airport by Airport Across Africa
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-800 leading-[1.1]">
              Level Of Service for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-navy-900 via-brand-gold-600 to-brand-navy-900 bg-clip-text text-transparent">
                African Airports.
              </span>
            </h1>

            {/* Positioning Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
              Finding a porter you can trust. Fighting 20 drivers. No place to rest before your next meeting.{' '}
              <strong className="text-brand-navy-800 font-semibold">LOS Hub changes that.</strong> Book verified airport porters, executive rides, and VIP lounge access.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto font-bold shadow-goldGlow text-base px-8"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Book MM2 Airport Service Now
              </Button>
              <Link href="/airports" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
                  <Globe className="mr-2 h-4 w-4 text-brand-navy-800" />
                  Explore Airport Directory
                </Button>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-emerald-600" />
                <span>100% Uniformed & Verified Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-emerald-600" />
                <span>Zero Curb Haggling • Fixed NGN Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-emerald-600" />
                <span>FAAN Compliant Protocol</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MULTI-AIRPORT SELECTOR STRIP */}
      <section className="bg-white py-8 border-y border-slate-200/80">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-gold-600 mb-1">
                Multi-Airport Network Architecture
              </div>
              <h2 className="text-xl font-bold text-brand-navy-800">
                Select Your Terminal & View Live Services
              </h2>
            </div>

            {/* Airport Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {ALL_AIRPORTS.map((apt) => {
                const isActive = apt.code === currentAirport.code;
                const isLive = apt.status === 'ACTIVE';

                return (
                  <button
                    key={apt.id}
                    onClick={() => selectAirport(apt.code)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-navy-800 text-white shadow-subtle ring-2 ring-brand-gold-500'
                        : isLive
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-400 opacity-60'
                    }`}
                  >
                    <Plane className="h-3.5 w-3.5" />
                    <span>{apt.shortName}</span>
                    {isLive ? (
                      <span className="text-[10px] bg-brand-emerald-700 text-white px-1.5 py-0.5 rounded">
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* LAUNCH SERVICES SECTION */}
      <section className="py-6">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
              Verified Airport Offerings
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy-800">
              Launch Services Available at {currentAirport.shortName}
            </h2>
            <p className="text-sm text-slate-600">
              Book individually or combine for a seamless hands-free airport transit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LAUNCH_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleOpenBooking}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-brand-navy-950 py-20 text-white border-y border-brand-navy-800">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
              Simplicity & Elegance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How LOS Hub Works
            </h2>
            <p className="text-sm text-slate-300">
              4 steps to a stress-free airport experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 p-6 rounded-2xl bg-brand-navy-900 border border-brand-navy-800 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-600 text-brand-navy-950 font-extrabold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Choose Service</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your airport terminal (e.g. MM2) and choose between porter baggage escort, executive ride, or lounge pass.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-brand-navy-900 border border-brand-navy-800 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-600 text-brand-navy-950 font-extrabold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Instant Fixed Booking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter flight details and date. Instant confirmation in Nigerian Naira (₦) with zero pricing surprises.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-brand-navy-900 border border-brand-navy-800 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-600 text-brand-navy-950 font-extrabold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Verified Agent Meet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your uniformed agent greets you at curbside or carousel with digital ID verification and flight tracking.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-brand-navy-900 border border-brand-navy-800 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold-600 text-brand-navy-950 font-extrabold text-sm">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Enjoy Level Of Service</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience 30% faster exit speed, zero luggage stress, and relax in VIP comfort before takeoff.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* METRICS SECTION */}
      <StatsSection />

      {/* CORPORATE TRAVEL PREVIEW */}
      <section className="py-8">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white p-8 sm:p-12 border border-slate-200/80 shadow-card flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                Enterprise & Corporate Travel
              </span>
              <h2 className="text-3xl font-bold text-brand-navy-800 tracking-tight">
                Streamline Executive Travel for Your Company
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consolidated monthly invoicing, dedicated airport hosts, expense oversight, and priority lounge bookings for executives traveling through MM2 and regional hubs.
              </p>
              <div className="pt-2">
                <Link href="/corporate">
                  <Button variant="primary" size="md" className="font-bold">
                    Explore Corporate Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Corporate Card Mock */}
            <div className="w-full lg:w-96 rounded-2xl bg-brand-navy-900 p-6 text-white border border-brand-gold-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-brand-navy-700 pb-3">
                <span className="text-xs font-bold text-brand-gold-500 uppercase tracking-wider">
                  Corporate Travel Account
                </span>
                <Badge variant="gold">Enterprise</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-white">First Bank of Nigeria</div>
                <div className="text-xs text-slate-300">42 Executive Travelers Enrolled</div>
                <div className="text-xs text-slate-400">Monthly Invoicing Active • Consolidated Billing</div>
              </div>
              <div className="pt-2 border-t border-brand-navy-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Current Month Spend:</span>
                <span className="font-extrabold text-brand-gold-500">₦1,250,000 NGN</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ SECTION */}
      <section className="py-6">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
              Clear Answers
            </span>
            <h2 className="text-3xl font-bold text-brand-navy-800">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </Container>
      </section>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        airport={currentAirport}
        preselectedServiceId={selectedServiceId}
      />

      {/* DEMO ROLE SWITCHER */}
      <RoleSwitcher />
    </div>
  );
}
