import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import { Plane, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Airports Directory — LOS Hub Multi-Airport Network',
  description: 'Explore active and upcoming airport terminals across Nigeria and Africa, starting with MM2 Lagos.',
};

export default function AirportsDirectoryPage() {
  return (
    <div className="py-12 space-y-12">
      <Container>
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
            Multi-Airport Network
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight">
            Airports Directory
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            LOS Hub is launching airport by airport across Africa. Select a terminal below to inspect available services, operating hours, and live launch statuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ALL_AIRPORTS.map((airport) => (
            <Card key={airport.id} className="overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={airport.heroImageUrl}
                    alt={airport.name}
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant={airport.status === 'ACTIVE' ? 'gold' : 'comingSoon'}>
                      {airport.status === 'ACTIVE' ? 'Live Launch Airport' : 'Expanding Soon'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-mono text-2xl font-bold tracking-wider">{airport.code}</span>
                    <span className="text-xs font-semibold">{airport.city}, {airport.country}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-navy-800">
                    {airport.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 mt-1">
                    {airport.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-gold-600" />
                    <span>Operating Hours: <strong>{airport.operatingHours}</strong></span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-brand-emerald-600" />
                    <span>Configured Services: <strong>{airport.services.length} Offerings</strong></span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4 border-t border-slate-100">
                <Link
                  href={`/airports/${airport.code.toLowerCase()}`}
                  className="w-full inline-flex items-center justify-between rounded-lg bg-brand-navy-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-navy-700 transition-colors"
                >
                  <span>View Terminal Hub</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
