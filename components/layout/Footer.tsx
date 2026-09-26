'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';
import { siteConfig } from '@/lib/config/site.config';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-navy-950 text-slate-300 pt-16 pb-12 border-t border-brand-navy-800">
      <Container>
        {/* Top CTA Banner in Footer */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-900 p-8 sm:p-12 border border-brand-gold-600/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-brand-gold-500 font-bold flex items-center gap-1.5 justify-center md:justify-start">
              <Shield className="h-4 w-4" />
              Verified Airport Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to elevate your airport journey at MM2?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Book a verified porter, reserve an executive cab, or access VIP lounges in under 60 seconds.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-gold-600 px-6 py-3.5 text-sm font-semibold text-brand-navy-900 hover:bg-brand-gold-500 shadow-goldGlow transition-all"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-navy-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              LOS Hub is Nigeria’s official airport experience platform. We bring Level Of Service to African airports through verified porters, executive cabs, and lounge access.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-brand-gold-500 font-medium">
              <Globe className="h-4 w-4" />
              <span>Launching at MM2 Lagos • Expanding across Africa</span>
            </div>
          </div>

          {/* Col 2: Active & Future Airports */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Airports
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {ALL_AIRPORTS.map((airport) => (
                <li key={airport.id}>
                  <Link
                    href={`/airports/${airport.code.toLowerCase()}`}
                    className="hover:text-brand-gold-500 transition-colors flex items-center justify-between"
                  >
                    <span>{airport.shortName}</span>
                    {airport.status === 'ACTIVE' && (
                      <span className="text-[10px] bg-brand-emerald-900/60 text-brand-emerald-400 px-1.5 py-0.5 rounded border border-brand-emerald-600/40">
                        Live
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Verified Porter (₦5,000)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Airport Cab (₦15,000)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  VIP Lounge Access (₦20,000)
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-white transition-colors">
                  Corporate Accounts
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400">
              Get airport launch updates and executive travel offers.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-brand-emerald-400 bg-brand-emerald-950/60 p-3 rounded-lg border border-brand-emerald-800">
                <CheckCircle className="h-4 w-4" />
                <span>Thank you! You are on the priority list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-label="Enter work email"
                  required
                  placeholder="Enter work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md bg-brand-navy-900 border border-brand-navy-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-brand-gold-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-brand-gold-600 px-3.5 py-2 text-xs font-bold text-brand-navy-950 hover:bg-brand-gold-500 transition-colors"
                >
                  Subscribe Updates
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} LOS Hub Ltd. All rights reserved. Registered in Nigeria.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
