'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { ServiceDetail } from '@/types/service';
import { formatCurrencyNGN } from '@/lib/utils/formatters';
import { Check, Luggage, Car, Coffee, Zap, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceDetail;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const isAvailable = service.launchStatus === 'LAUNCHED';

  const renderIcon = () => {
    switch (service.iconName) {
      case 'Luggage':
        return <Luggage className="h-6 w-6 text-brand-gold-600" />;
      case 'Car':
        return <Car className="h-6 w-6 text-brand-gold-600" />;
      case 'Coffee':
        return <Coffee className="h-6 w-6 text-brand-gold-600" />;
      default:
        return <Zap className="h-6 w-6 text-brand-gold-600" />;
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full border-slate-200/80 transition-all duration-300 hover:border-brand-gold-500/50 hover:shadow-glass group">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy-50 group-hover:bg-brand-navy-800 transition-colors">
            {renderIcon()}
          </div>
          {service.badge && (
            <Badge variant={isAvailable ? 'gold' : 'comingSoon'}>
              {service.badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold text-brand-navy-800">
          {service.title}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 mt-2 leading-relaxed">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="pt-2 border-t border-slate-100">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            What is included
          </div>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <Check className="h-4 w-4 text-brand-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Fixed Rate</div>
          <div className="text-lg font-extrabold text-brand-navy-800">
            {isAvailable ? (
              formatCurrencyNGN(service.startingPriceNGN)
            ) : (
              <span className="text-sm font-semibold text-slate-500">Coming Soon</span>
            )}
          </div>
        </div>

        <Button
          variant={isAvailable ? 'gold' : 'outline'}
          size="sm"
          disabled={!isAvailable}
          onClick={() => onBook(service.id)}
          className="font-semibold"
        >
          {isAvailable ? (
            <>
              Book Now
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </>
          ) : (
            'Notify Me'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
