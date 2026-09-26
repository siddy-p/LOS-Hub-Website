'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/features/ServiceCard';
import { AirportService } from '@/lib/services/airportService';
import { BookingModal } from '@/components/features/BookingModal';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ServiceType } from '@/types/airport';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default function SingleAirportPage({ params }: PageProps) {
  const { code } = use(params);
  const airport = AirportService.getAirportByCode(code);

  if (!airport) {
    notFound();
  }

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('porter');

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId && (serviceId === 'porter' || serviceId === 'cab' || serviceId === 'lounge')) {
      setSelectedServiceId(serviceId as ServiceType);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header for Airport */}
      <section className="relative bg-brand-navy-950 py-16 text-white border-b border-brand-navy-800">
        <Container>
          <div className="mb-6">
            <Link
              href="/airports"
              className="inline-flex items-center gap-1.5 text-xs text-brand-gold-500 font-semibold hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Airports
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-brand-gold-500 bg-brand-navy-900 px-3 py-1 rounded-lg border border-brand-gold-500/30">
                  {airport.code}
                </span>
                <Badge variant={airport.status === 'ACTIVE' ? 'gold' : 'comingSoon'}>
                  {airport.status === 'ACTIVE' ? 'Live Airport Hub' : 'Expanding Soon'}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {airport.name}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                {airport.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-gold-500" />
                  <span>{airport.city}, {airport.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-gold-500" />
                  <span>{airport.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="gold"
                size="lg"
                onClick={() => handleOpenBooking()}
                disabled={airport.status !== 'ACTIVE'}
                className="font-bold shadow-goldGlow"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {airport.status === 'ACTIVE' ? `Book Services at ${airport.code}` : 'Expanding Soon'}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services List for this specific Airport */}
      <section>
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
              Configured Services
            </span>
            <h2 className="text-3xl font-bold text-brand-navy-800">
              Available Offerings at {airport.shortName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airport.services.map((svc) => (
              <div
                key={svc.serviceId}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-brand-navy-800">{svc.name}</span>
                    <Badge variant={svc.available ? 'gold' : 'comingSoon'}>
                      {svc.available ? 'Available' : 'Soon'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Rate</div>
                    <div className="text-base font-extrabold text-brand-navy-800">
                      {svc.available ? `₦${svc.priceNGN.toLocaleString()}` : 'Coming Soon'}
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    size="sm"
                    disabled={!svc.available}
                    onClick={() => handleOpenBooking(svc.serviceId)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        airport={airport}
        preselectedServiceId={selectedServiceId}
      />

      <RoleSwitcher />
    </div>
  );
}
