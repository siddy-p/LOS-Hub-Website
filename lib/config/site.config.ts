export const siteConfig = {
  name: 'LOS Hub',
  tagline: 'Level Of Service for African Airports',
  description:
    'Nigeria’s official airport experience platform. Book verified airport porters, premium airport rides, and executive lounge access. Starting at MM2 Lagos and expanding across Africa.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://los-hub.com',
  ogImage: '/images/og-image.jpg',
  brandColors: {
    primary: '#0F2137',   // Logo Deep Executive Navy
    accent: '#C59B27',    // Logo Rich Gold
    emerald: '#115E3B',   // Logo Verified Emerald Green
    background: '#FAFAFA',
  },
  positioning: {
    tagline: 'Bringing Level Of Service to African airports.',
    problem: 'Finding a porter you can trust. Fighting 20 drivers. No place to rest. No quiet place before your next meeting.',
    solution: 'LOS Hub changes that. Book a verified porter, book a verified airport ride, reserve lounge access. One trusted platform.',
    mission: 'Make every airport in Africa feel like Changi.',
    launchAirport: 'MM2 Lagos',
  },
  stats: {
    waitlistCount: '3,000+',
    grossBookings: '₦4.5M',
    repeatUsers: '65%',
    exitSpeedup: '30%',
  },
  contacts: {
    email: 'hello@loshub.com',
    supportEmail: 'support@loshub.com',
    corporateEmail: 'corporate@loshub.com',
    phone: '+234 1 800 5674',
    address: 'MM2 Terminal, Murtala Muhammed Airport, Ikeja, Lagos, Nigeria',
  },
  social: {
    twitter: 'https://twitter.com/loshub_af',
    linkedin: 'https://linkedin.com/company/loshub',
    instagram: 'https://instagram.com/loshub.official',
  },
};
