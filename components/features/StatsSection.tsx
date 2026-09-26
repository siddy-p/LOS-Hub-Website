import React from 'react';
import { Container } from '@/components/layout/Container';
import { siteConfig } from '@/lib/config/site.config';
import { Users, TrendingUp, RefreshCw, Zap } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      label: 'Early Access Waitlist',
      value: siteConfig.stats.waitlistCount,
      description: 'Travelers registered across Lagos & Abuja',
      icon: Users,
    },
    {
      label: 'Gross Bookings',
      value: siteConfig.stats.grossBookings,
      description: 'Verified airport service transactions',
      icon: TrendingUp,
    },
    {
      label: 'Repeat Users',
      value: siteConfig.stats.repeatUsers,
      description: 'Executive travelers booking monthly',
      icon: RefreshCw,
    },
    {
      label: 'Faster Airport Exit',
      value: siteConfig.stats.exitSpeedup,
      description: 'Reduced time from landing to exit curb',
      icon: Zap,
    },
  ];

  return (
    <section className="bg-brand-navy-900 py-16 text-white border-y border-brand-navy-800">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-2 border-l border-brand-gold-500/20 pl-6">
                <div className="flex items-center gap-2 text-brand-gold-500 mb-1">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                    {item.label}
                  </span>
                </div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
