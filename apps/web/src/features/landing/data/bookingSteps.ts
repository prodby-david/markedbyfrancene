import type { BookingStepItem } from '../types/landing.types';

export const bookingJourneySteps: readonly BookingStepItem[] = [
  {
    title: 'Submit an inquiry',
    description:
      'Visit our website and fill out the inquiry form with your event details and preferred schedule.',
  },
  {
    title: 'Inquiry review',
    description:
      "I'll personally review your inquiry and get in touch with you to discuss the details, requirements, and service preferences.",
  },
  {
    title: 'Booking & Down Payment',
    description:
      "Once everything is discussed and finalized, you'll receive the booking link to proceed with your appointment and payment of the required down payment.",
  },
  {
    title: 'Calendar confirmation',
    description:
      'Once your payment is verified, please allow time for your appointment to reflect on our calendar.',
  },
];
