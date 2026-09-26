'use client';

import { useState, useCallback } from 'react';
import { Airport } from '@/types/airport';
import { AirportService } from '@/lib/services/airportService';

export function useAirport(initialCode?: string) {
  const [currentAirport, setCurrentAirport] = useState<Airport>(() => {
    if (initialCode) {
      const found = AirportService.getAirportByCode(initialCode);
      if (found) return found;
    }
    return AirportService.getDefaultAirport();
  });

  const selectAirport = useCallback((code: string) => {
    const airport = AirportService.getAirportByCode(code);
    if (airport) {
      setCurrentAirport(airport);
    }
  }, []);

  return {
    currentAirport,
    selectAirport,
    allAirports: AirportService.getAllAirports(),
    activeAirports: AirportService.getActiveAirports(),
  };
}
