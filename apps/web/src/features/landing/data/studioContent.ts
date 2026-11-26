import type {
  BookingReminderSection,
  FaqItem,
  ReferenceLookCard,
  ReferenceServiceItem,
  StudioContactInfo,
  StudioStatItem,
} from '../types/landing.types';

export const studioStats: readonly StudioStatItem[] = [
  { value: '100+', label: 'Satisfied Clients' },
  { value: '5+ Years', label: 'Beauty Experience' },
  { value: '99%', label: 'Positive Feedback' },
];

export const bookingReminderSections: readonly BookingReminderSection[] = [
  {
    heading: '1. Check Availability Before Booking',
    paragraphs: [
      'All dates and time slots marked as busy or booked on the calendar are already reserved and are NOT available for booking. Please check the calendar carefully before submitting your booking request.',
    ],
  },
  {
    heading: '2. Downpayment Is Required',
    paragraphs: [
      'A 50% downpayment of your selected makeup service rate is required to confirm your booking.',
      'For example, if your selected service costs ₱1,800:',
    ],
    bullets: [
      'Downpayment (50%): ₱900',
      'Remaining Balance (50%): ₱900',
      'Transportation Fee: Added to the remaining balance.',
    ],
  },
  {
    heading: '3. Transportation Fee',
    paragraphs: [
      'The transportation fee is not included in the initial service rate. It will be calculated based on your location and added to your remaining balance.',
    ],
  },
  {
    heading: '4. Booking Confirmation & Calendar Updates',
    paragraphs: [
      'After submitting your booking, please check the calendar again on the following days to ensure that your booking has been reflected.',
      'If your booking does not appear on the calendar within 3 days, kindly contact us for assistance and verification.',
      'Thank you for choosing Marked by Francene! We appreciate your trust and look forward to being part of your special occasion.',
    ],
  },
];

export const referenceLooks: readonly ReferenceLookCard[] = [
  {
    id: 'look-fresh-natural',
    title: 'Fresh / Natural Makeup',
    description:
      'A clean, natural-looking glow that enhances your features with a fresh, radiant, and effortless finish.',
    imageUrl: '/images/hero-editorial.jpg',
  },
  {
    id: 'look-soft-glam',
    title: 'Soft Glam Makeup',
    description:
      'A soft, romantic look with blended tones and delicate details for a naturally beautiful finish.',
    imageUrl: '/images/look-soft-glam.jpg',
  },
  {
    id: 'look-full-glam',
    title: 'Full Glam Makeup',
    description:
      'A glamorous, polished look with enhanced eyes, defined features, and a flawless finish for special occasions.',
    imageUrl: '/images/look-editorial.jpg',
  },
  {
    id: 'look-creative',
    title: 'Creative Makeup',
    description:
      'A bold, artistic look that brings your imagination to life through unique colors, expressive details, and creative techniques.',
    imageUrl: '/images/hero-editorial.jpg',
  },
];

export const referenceServices: readonly ReferenceServiceItem[] = [
  {
    number: '01.',
    title: 'Makeup Services',
    description:
      'From fresh and natural to soft glam, full glam, and creative makeup, find the perfect look for your style and special occasion.',
  },
  {
    number: '02.',
    title: 'Hairstyling',
    description:
      'Complete your look with beautiful hairstyling, from elegant and romantic styles to polished looks for any occasion.',
  },
  {
    number: '03.',
    title: 'Creative Makeup',
    description:
      'Explore artistic and expressive makeup looks featuring unique colors, creative designs, and imaginative details.',
  },
  {
    number: '04.',
    title: 'One-on-One Makeup Lessons',
    description:
      'Learn makeup techniques at your own pace through a personalized one-on-one session tailored to your needs, skill level, and beauty goals.',
  },
];

export const studioFaqs: readonly FaqItem[] = [
  {
    id: 'faq-01',
    number: '01.',
    question: 'Where are you based?',
    answer:
      'We are a Taguig–Pasig-based hair and makeup service provider. We cater to clients within nearby areas and other locations, depending on availability and travel arrangements.',
  },
  {
    id: 'faq-02',
    number: '02.',
    question: 'Do you accept studio appointments or walk-ins?',
    answer:
      'We exclusively offer on-location hair and makeup services. We travel directly to your home, hotel, event venue, or preferred preparation location. Please note that we do not have a physical studio and do not accommodate walk-in appointments.',
  },
  {
    id: 'faq-03',
    number: '03.',
    question: 'What areas do you cover?',
    answer:
      'We are primarily based in the Taguig–Pasig area and accommodate on-location services in nearby cities and selected out-of-town locations. Travel fees may apply depending on the distance and location of your event.',
  },
  {
    id: 'faq-04',
    number: '04.',
    question: 'What services do you offer?',
    answer:
      'We offer Fresh Natural Makeup, Soft Glam Makeup, Full Glam Makeup, and Creative Makeup. We cater to weddings, debuts, birthdays, photoshoots, and other special occasions.',
  },
  {
    id: 'faq-05',
    number: '05.',
    question: 'How much are your makeup rates?',
    answer:
      'Our regular makeup rate is ₱1,800 per person for any makeup look as part of our special Ber-months promotion! Whether you prefer natural, soft glam, full glam, or event makeup, the promotional rate remains the same. For hair styling, hair and makeup combinations, bridal services, and group inquiries, kindly send us your event details so we can provide the appropriate quotation.',
  },
  {
    id: 'faq-06',
    number: '06.',
    question: 'Are there additional fees?',
    answer:
      'Depending on your event location and requirements, additional charges may apply, including transportation or travel fees or early call-time fees. Any applicable additional charges will be communicated before proceeding with a booking.',
  },
  {
    id: 'faq-07',
    number: '07.',
    question: 'How long does a hair and makeup session take?',
    answer:
      'The preparation time depends on the desired look, hairstyle complexity, makeup requirements, and number of clients. For group bookings, we recommend providing your preferred call time and event schedule so we can plan the preparation accordingly.',
  },
  {
    id: 'faq-08',
    number: '08.',
    question: 'What should I prepare before the session?',
    answer: 'To ensure a smooth and comfortable preparation, we recommend the following:',
    bullets: [
      'Arrive with a clean face, free from makeup.',
      'Strictly do not put any hair oil, conditioner or any oily products to hold your curls or hairstyle',
      'Have clean and completely dry hair unless otherwise instructed.',
      'Wear comfortable clothing that is easy to change out of.',
      'Prepare your preferred hair and makeup inspiration photos.',
      'Provide a clean, well-lit, and comfortable preparation area.',
      'Have a table and accessible power outlet available.',
      'Inform us beforehand of any special requests or requirements.',
    ],
  },
  {
    id: 'faq-09',
    number: '09.',
    question: 'Do you accommodate group bookings?',
    answer:
      'Yes! We accommodate individual and group inquiries for weddings, debuts, birthdays, and other special occasions. Kindly indicate the total number of people requiring makeup, hair styling, or both when submitting your inquiry so we can assess the preparation time and provide the appropriate quotation.',
  },
];

export const studioContact: StudioContactInfo = {
  artistName: 'Francene Villamea',
  roleTitle: 'Professional Hair & Makeup Artist',
  phoneDisplay: '+63 9303240299',
  phoneHref: 'tel:+639303240299',
  email: 'markedbyfrancene@gmail.com',
  location: 'Taguig-Pasig Based',
};
