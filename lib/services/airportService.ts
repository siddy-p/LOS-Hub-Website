import { ALL_AIRPORTS, DEFAULT_AIRPORT_CODE } from '@/lib/config/airports.config';
import { Airport } from '@/types/airport';

export class AirportService {
  static getAllAirports(): Airport[] {
    return ALL_AIRPORTS;
  }

  static getActiveAirports(): Airport[] {
    return ALL_AIRPORTS.filter((a) => a.status === 'ACTIVE');
  }

  static getAirportByCode(code: string): Airport | undefined {
    const uppercaseCode = code.toUpperCase();
    return ALL_AIRPORTS.find((a) => a.code.toUpperCase() === uppercaseCode);
  }

  static getDefaultAirport(): Airport {
    const defaultAirport = this.getAirportByCode(DEFAULT_AIRPORT_CODE);
    if (!defaultAirport) {
      throw new Error(`Default airport code ${DEFAULT_AIRPORT_CODE} not found.`);
    }
    return defaultAirport;
  }
}
