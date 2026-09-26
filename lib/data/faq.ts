export interface FAQItem {
  id: string;
  category: 'Airport' | 'Booking' | 'Payments' | 'Safety' | 'Refunds' | 'Verification';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Airport',
    question: 'Where is LOS Hub currently active?',
    answer: 'LOS Hub is officially live at MM2 (Murtala Muhammed Airport Terminal 2) in Lagos. We are actively expanding to MMIA International, Abuja (ABV), Port Harcourt (PHC), and key airports across Africa.',
  },
  {
    id: 'faq-2',
    category: 'Booking',
    question: 'How far in advance should I book my porter or cab?',
    answer: 'We recommend booking at least 2 hours prior to your scheduled flight arrival or departure time. However, instant bookings can often be fulfilled depending on live porter and driver availability at MM2.',
  },
  {
    id: 'faq-3',
    category: 'Verification',
    question: 'How do I know my porter or driver is genuine and verified?',
    answer: 'Every LOS Hub agent wears an official LOS Hub branded uniform with a high-visibility digital ID badge. Once booked, your app or SMS confirmation displays your agent’s unique verification code, photo, and direct contact details.',
  },
  {
    id: 'faq-4',
    category: 'Payments',
    question: 'Are prices fixed or subject to haggling?',
    answer: 'All LOS Hub services are 100% fixed and transparent in Nigerian Naira (₦). A verified porter is ₦5,000, lounge access is ₦20,000, and airport rides have guaranteed fixed rates. You never negotiate on the terminal curb.',
  },
  {
    id: 'faq-5',
    category: 'Safety',
    question: 'What safety measures are enforced for airport rides?',
    answer: 'All drivers undergo rigorous background checks, vehicle safety inspection, and active GPS tracking during every trip. Flight tracking ensures your driver is waiting even if your flight is delayed.',
  },
  {
    id: 'faq-6',
    category: 'Refunds',
    question: 'What is the refund policy for flight cancellations?',
    answer: 'Cancellations made 4+ hours before your scheduled airport time receive a 100% full refund. If your flight is delayed by an airline, your booking is automatically rescheduled at zero extra cost.',
  },
];
