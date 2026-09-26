export type UserRole =
  | 'traveler'
  | 'driver'
  | 'porter'
  | 'hotel_partner'
  | 'lounge_partner'
  | 'corporate_admin'
  | 'airline_staff'
  | 'faan_ops'
  | 'super_admin';

export interface RolePersona {
  role: UserRole;
  name: string;
  title: string;
  avatar: string;
  organization: string;
  badge: string;
  accentColor: string;
  routePath: string;
}

export const ROLE_PERSONAS: Record<UserRole, RolePersona> = {
  traveler: {
    role: 'traveler',
    name: 'Dr. Babatunde Lawal',
    title: 'Executive Traveler',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    organization: 'First Bank Nigeria',
    badge: 'Platinum Member',
    accentColor: '#162E4D',
    routePath: '/traveler',
  },
  driver: {
    role: 'driver',
    name: 'Samuel Okon',
    title: 'Verified Executive Chauffeur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    organization: 'LOS Fleet Unit 4',
    badge: 'Rating 4.98 ★',
    accentColor: '#C59B27',
    routePath: '/driver',
  },
  porter: {
    role: 'porter',
    name: 'Emeka Nnamdi',
    title: 'Verified Airport Porter Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    organization: 'MM2 Baggage Operations',
    badge: 'Badge #MM2-884',
    accentColor: '#115E3B',
    routePath: '/porter',
  },
  hotel_partner: {
    role: 'hotel_partner',
    name: 'Chef Sarah Alabi',
    title: 'General Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    organization: 'Radisson Blu Ikeja',
    badge: 'Hospitality Partner',
    accentColor: '#4F46E5',
    routePath: '/partner',
  },
  lounge_partner: {
    role: 'lounge_partner',
    name: 'Victoria Adeyemi',
    title: 'Lounge Operations Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    organization: 'MM2 Executive Lounge',
    badge: 'VIP Lounge Host',
    accentColor: '#9333EA',
    routePath: '/partner',
  },
  corporate_admin: {
    role: 'corporate_admin',
    name: 'Chief Folake Akindele',
    title: 'Head of Corporate Travel',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop',
    organization: 'GTBank Enterprise',
    badge: 'Corporate Master',
    accentColor: '#0284C7',
    routePath: '/corporate-portal',
  },
  airline_staff: {
    role: 'airline_staff',
    name: 'Capt. Ibrahim Musa',
    title: 'Ground Station Manager',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    organization: 'Air Peace Commercial',
    badge: 'Flight P4 7122',
    accentColor: '#DC2626',
    routePath: '/airline',
  },
  faan_ops: {
    role: 'faan_ops',
    name: 'Engr. Donald Oladipo',
    title: 'Director of Airport Operations',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    organization: 'FAAN (Federal Airports Authority)',
    badge: 'FAAN Command Center',
    accentColor: '#059669',
    routePath: '/faan',
  },
  super_admin: {
    role: 'super_admin',
    name: 'Siddy (Platform Founder)',
    title: 'Super Administrator',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    organization: 'LOS Hub HQ',
    badge: 'Root Admin',
    accentColor: '#D4AF37',
    routePath: '/admin',
  },
};
