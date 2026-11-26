import type {
  ReviewsSummary,
  VerifiedReview,
} from '../../../types/catalog.types';

export type ReviewSortOrder = 'newest' | 'highest';

export interface ReviewServiceOption {
  id: number | 'all';
  label: string;
}

export interface RatingDistributionRow {
  stars: number;
  count: number;
  percentage: number;
}

export interface RatingSummaryCardProps {
  summary: ReviewsSummary;
  distribution: RatingDistributionRow[];
}

export interface ReviewServiceFilterProps {
  options: readonly ReviewServiceOption[];
  selectedServiceId: number | 'all';
  onServiceChange: (serviceId: number | 'all') => void;
  sortOrder: ReviewSortOrder;
  onSortOrderChange: (order: ReviewSortOrder) => void;
}

export interface ReviewCardProps {
  review: VerifiedReview;
}
