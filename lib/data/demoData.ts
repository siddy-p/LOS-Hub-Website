export interface DemoFlight {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  terminal: string;
  scheduledTime: string;
  status: 'ON_TIME' | 'BOARDING' | 'LANDED' | 'DELAYED';
  gate: string;
}

export interface DemoBooking {
  id: string;
  passengerName: string;
  passengerPhone: string;
  airportCode: string;
  serviceName: string;
  serviceType: 'porter' | 'cab' | 'lounge' | 'fasttrack';
  amountNGN: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  flightNumber: string;
  scheduledTime: string;
  assignedAgentName: string;
  assignedAgentPhone: string;
  verificationCode: string;
}

export interface DemoDriverRide {
  id: string;
  passengerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  fareNGN: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED';
  flightNumber: string;
  eta: string;
}

export interface DemoPorterTask {
  id: string;
  passengerName: string;
  luggageCount: number;
  pickupPoint: string;
  destinationPoint: string;
  status: 'ASSIGNED' | 'MET_PASSENGER' | 'CHECKED_IN' | 'COMPLETED';
  verificationCode: string;
  tipAmountNGN?: number;
}

export const DEMO_FLIGHTS: DemoFlight[] = [
  { flightNumber: 'P4 7122', airline: 'Air Peace', origin: 'Abuja (ABV)', destination: 'Lagos (MM2)', terminal: 'Terminal 2', scheduledTime: '14:30 WAT', status: 'LANDED', gate: 'Gate 4' },
  { flightNumber: 'Q2 504', airline: 'Ibom Air', origin: 'Uyo (QUO)', destination: 'Lagos (MM2)', terminal: 'Terminal 2', scheduledTime: '15:15 WAT', status: 'ON_TIME', gate: 'Gate 2' },
  { flightNumber: 'BA 075', airline: 'British Airways', origin: 'London Heathrow (LHR)', destination: 'Lagos (MMIA)', terminal: 'Intl Terminal 2', scheduledTime: '18:45 WAT', status: 'ON_TIME', gate: 'Gate 12' },
  { flightNumber: 'MS 876', airline: 'EgyptAir', origin: 'Cairo (CAI)', destination: 'Lagos (MMIA)', terminal: 'Intl Terminal 1', scheduledTime: '19:20 WAT', status: 'DELAYED', gate: 'Gate 8' },
];

export const DEMO_BOOKINGS: DemoBooking[] = [
  {
    id: 'LOB-892101',
    passengerName: 'Dr. Babatunde Lawal',
    passengerPhone: '+234 803 123 4567',
    airportCode: 'MM2',
    serviceName: 'Verified Baggage Porter',
    serviceType: 'porter',
    amountNGN: 5000,
    status: 'CONFIRMED',
    flightNumber: 'P4 7122',
    scheduledTime: 'Today, 14:30 WAT',
    assignedAgentName: 'Emeka Nnamdi (Porter #884)',
    assignedAgentPhone: '+234 802 888 1122',
    verificationCode: 'PRT-892',
  },
  {
    id: 'LOB-892102',
    passengerName: 'Dr. Babatunde Lawal',
    passengerPhone: '+234 803 123 4567',
    airportCode: 'MM2',
    serviceName: 'Verified Executive Cab (Lexus RX350)',
    serviceType: 'cab',
    amountNGN: 15000,
    status: 'IN_PROGRESS',
    flightNumber: 'P4 7122',
    scheduledTime: 'Today, 14:45 WAT',
    assignedAgentName: 'Samuel Okon (Chauffeur Unit 4)',
    assignedAgentPhone: '+234 805 777 3344',
    verificationCode: 'CAB-402',
  },
  {
    id: 'LOB-892103',
    passengerName: 'Chief Folake Akindele',
    passengerPhone: '+234 809 999 0000',
    airportCode: 'MM2',
    serviceName: 'VIP Executive Lounge Access',
    serviceType: 'lounge',
    amountNGN: 20000,
    status: 'CONFIRMED',
    flightNumber: 'Q2 504',
    scheduledTime: 'Today, 16:00 WAT',
    assignedAgentName: 'Victoria Adeyemi (Lounge Desk)',
    assignedAgentPhone: '+234 801 222 5555',
    verificationCode: 'LNG-991',
  },
];

export const DEMO_DRIVER_RIDES: DemoDriverRide[] = [
  {
    id: 'RIDE-104',
    passengerName: 'Dr. Babatunde Lawal',
    pickupLocation: 'MM2 Arrival Curbside Door 3',
    dropoffLocation: 'Radisson Blu, Victoria Island, Lagos',
    fareNGN: 15000,
    status: 'IN_PROGRESS',
    flightNumber: 'P4 7122',
    eta: '8 mins away',
  },
  {
    id: 'RIDE-105',
    passengerName: 'Amina Mohammed',
    pickupLocation: 'MM2 Departure Gate B',
    dropoffLocation: 'Wheatbaker Hotel, Ikoyi, Lagos',
    fareNGN: 18000,
    status: 'REQUESTED',
    flightNumber: 'Q2 504',
    eta: 'Immediate pickup',
  },
];

export const DEMO_PORTER_TASKS: DemoPorterTask[] = [
  {
    id: 'TASK-551',
    passengerName: 'Dr. Babatunde Lawal',
    luggageCount: 3,
    pickupPoint: 'Air Peace Baggage Carousel 2',
    destinationPoint: 'Executive Cab Pick-up Bay',
    status: 'MET_PASSENGER',
    verificationCode: 'PRT-892',
  },
  {
    id: 'TASK-552',
    passengerName: 'Chief Folake Akindele',
    luggageCount: 2,
    pickupPoint: 'MM2 Main Entrance Gate 1',
    destinationPoint: 'VIP Lounge Reception Floor 2',
    status: 'ASSIGNED',
    verificationCode: 'PRT-904',
  },
];

export const FAAN_OPS_METRICS = {
  activePortersOnShift: 148,
  activeDriversCheckedIn: 240,
  dailyPassengersServed: 14280,
  averageExitTimeMins: 12.4,
  slaCompliancePercentage: 99.4,
  totalGrossBookingsTodayNGN: 4850000,
  liveIncidentAlerts: 0,
};
