export type AirportStatus = 'ACTIVE' | 'EXPANDING_SOON' | 'PLANNED';

export type ServiceType = 'porter' | 'cab' | 'lounge' | 'fasttrack';

export interface AirportServicePricing {
  serviceId: ServiceType;
  name: string;
  priceNGN: number;
  unit: string;
  available: boolean;
  comingSoon?: boolean;
  tagline?: string;
  description: string;
}

export interface AirportTerminal {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface AirportContact {
  phone: string;
  email: string;
  supportHours: string;
}

export interface Airport {
  id: string;
  code: string;               // e.g., "MM2", "MMIA", "ABV", "PHC"
  name: string;               // "Murtala Muhammed Airport Terminal 2"
  shortName: string;          // "MM2 Lagos"
  city: string;               // "Lagos"
  country: string;            // "Nigeria"
  countryCode: string;        // "NG"
  currency: string;           // "NGN"
  currencySymbol: string;     // "₦"
  timezone: string;           // "Africa/Lagos"
  status: AirportStatus;
  launchYear: number;
  heroImageUrl: string;
  description: string;
  terminals: AirportTerminal[];
  services: AirportServicePricing[];
  operatingHours: string;
  contact: AirportContact;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface CountryAirports {
  country: string;
  countryCode: string;
  flagEmoji: string;
  airports: Airport[];
}
