'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ServiceCard } from '@/components/features/ServiceCard';
import { LAUNCH_SERVICES } from '@/lib/data/services';
import { BookingModal } from '@/components/features/BookingModal';
import { useAirport } from '@/hooks/useAirport';
import { ServiceType } from '@/types/airport';

export default function ServicesPage() {
  const { currentAirport } = useAirport('MM2');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('porter');

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId && (serviceId === 'porter' || serviceId === 'cab' || serviceId === 'lounge')) {
      setSelectedServiceId(serviceId as ServiceType);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="py-12 space-y-12">
      <Container>
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
            Official Airport Services
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight">
            Launch Airport Services & Fixed Pricing
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            All services are currently live at <strong className="text-slate-900">{currentAirport.name}</strong>. Prices are guaranteed fixed in NGN with no hidden surcharges.
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

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        airport={currentAirport}
        preselectedServiceId={selectedServiceId}
      />
    </div>
  );
}
