import { ServiceType } from './airport';

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  badge?: string;
  launchStatus: 'LAUNCHED' | 'COMING_SOON';
  features: string[];
  startingPriceNGN: number;
  priceUnit: string;
  iconName: string;
  heroImage: string;
}

export interface BookingRequest {
  airportCode: string;
  serviceId: ServiceType;
  fullName: string;
  email: string;
  phone: string;
  flightNumber?: string;
  terminalCode?: string;
  passengerCount: number;
  scheduledDate: string; // ISO format string
  scheduledTime: string;
  specialRequests?: string;
  totalPriceNGN: number;
}

export interface BookingResponse {
  bookingId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: string;
  airportCode: string;
  serviceId: ServiceType;
  totalPriceFormatted: string;
  message: string;
}
