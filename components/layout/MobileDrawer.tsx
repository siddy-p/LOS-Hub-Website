'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/config/site.config';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenBooking }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-2xl transition-transform flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <Logo />
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-6 space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Home
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/airports"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Airports Directory
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/services"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Services & Pricing
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/corporate"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Corporate Solutions
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/partners"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Partner Portal
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              About LOS Hub
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/faq"
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-800 hover:bg-slate-50"
            >
              Help & FAQ
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          </nav>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <Button
            variant="gold"
            className="w-full justify-center"
            size="lg"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
          >
            Book Experience Now
          </Button>

          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-gold-600" />
              <span>{siteConfig.contacts.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-brand-gold-600" />
              <span>{siteConfig.contacts.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
