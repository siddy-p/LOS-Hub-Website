'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import { AirportSelector } from '@/components/features/AirportSelector';
import { MobileDrawer } from './MobileDrawer';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAirport } from '@/hooks/useAirport';
import { BookingModal } from '@/components/features/BookingModal';

export function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const { currentAirport, selectAirport } = useAirport();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo & Airport Switcher */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/" className="transition-opacity hover:opacity-90">
                <Logo />
              </Link>
              <div className="hidden sm:block">
                <AirportSelector
                  currentAirport={currentAirport}
                  onSelectAirport={selectAirport}
                />
              </div>
            </div>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
              <Link
                href="/services"
                className="hover:text-brand-navy-800 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/airports"
                className="hover:text-brand-navy-800 transition-colors flex items-center gap-1.5"
              >
                Airports
                <span className="text-[10px] font-bold text-brand-emerald-700 bg-brand-emerald-50 px-1.5 py-0.5 rounded-full border border-brand-emerald-200">
                  Expanding
                </span>
              </Link>
              <Link
                href="/corporate"
                className="hover:text-brand-navy-800 transition-colors"
              >
                Corporate
              </Link>
              <Link
                href="/partners"
                className="hover:text-brand-navy-800 transition-colors"
              >
                Partners
              </Link>
              <Link
                href="/about"
                className="hover:text-brand-navy-800 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
              >
                Contact Sales
              </Link>
              <Button
                variant="gold"
                size="sm"
                className="font-semibold shadow-goldGlow"
                onClick={() => setBookingModalOpen(true)}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Book Airport Service
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="gold"
                size="sm"
                className="text-xs px-3 py-1.5"
                onClick={() => setBookingModalOpen(true)}
              >
                Book
              </Button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        airport={currentAirport}
      />
    </>
  );
}
