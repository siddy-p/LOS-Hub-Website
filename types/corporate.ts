export interface CorporateInquiry {
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  companySize: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  monthlyTravelersEstimate: string;
  preferredAirports: string[];
  message?: string;
}

export interface PartnerApplication {
  partnerType: 'driver' | 'porter' | 'airline' | 'hotel' | 'lounge' | 'ground_handler';
  fullNameOrCompany: string;
  email: string;
  phone: string;
  operatingAirports: string[];
  vehicleOrFleetCount?: string;
  operatingLicense?: string;
  notes?: string;
}
