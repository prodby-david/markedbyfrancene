import type { VerifiedReview } from '../../../types/catalog.types';

export interface BookingStepItem {
  title: string;
  description: string;
}

export interface StudioStatItem {
  value: string;
  label: string;
}

export interface ReferenceLookCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ReferenceServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface BookingReminderSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  bullets?: readonly string[];
}

export interface StudioContactInfo {
  artistName: string;
  roleTitle: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  location: string;
}

export interface AvailabilityDayCell {
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isPast: boolean;
  isAvailable: boolean;
}

export interface AvailabilityAndLoveNotesSectionProps {
  reviews: VerifiedReview[];
  isLoading: boolean;
}

export interface TestimonialsPreviewSectionProps {
  reviews: VerifiedReview[];
  isLoading: boolean;
}
