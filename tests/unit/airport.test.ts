import { describe, it, expect } from 'vitest';
import { AirportService } from '../../lib/services/airportService';
import { formatCurrencyNGN } from '../../lib/utils/formatters';

describe('AirportService & Multi-Airport Domain Engine', () => {
  it('should retrieve all configured airports', () => {
    const airports = AirportService.getAllAirports();
    expect(airports.length).toBeGreaterThanOrEqual(4);
  });

  it('should return MM2 Lagos as active launch airport', () => {
    const activeAirports = AirportService.getActiveAirports();
    expect(activeAirports.length).toBeGreaterThanOrEqual(1);
    expect(activeAirports[0].code).toBe('MM2');
    expect(activeAirports[0].status).toBe('ACTIVE');
  });

  it('should lookup airport by case-insensitive code', () => {
    const abuja = AirportService.getAirportByCode('abv');
    expect(abuja).toBeDefined();
    expect(abuja?.name).toContain('Nnamdi Azikiwe');
  });

  it('should format NGN currency correctly', () => {
    const formattedPorter = formatCurrencyNGN(5000);
    expect(formattedPorter).toContain('5,000');
  });
});
