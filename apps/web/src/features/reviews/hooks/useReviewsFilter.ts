import { useCallback, useMemo, useState } from 'react';
import type { VerifiedReview } from '../../../types/catalog.types';
import type {
  RatingDistributionRow,
  ReviewServiceOption,
  ReviewSortOrder,
} from '../types/reviewsFeature.types';

export function useReviewsFilter(reviews: VerifiedReview[]) {
  const [selectedServiceId, setSelectedServiceId] = useState<number | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('newest');

  const serviceOptions = useMemo<ReviewServiceOption[]>(() => {
    const map = new Map<number, string>();
    for (const review of reviews) {
      if (!map.has(review.service_id)) {
        map.set(review.service_id, review.service_name);
      }
    }
    const items: ReviewServiceOption[] = Array.from(map.entries()).map(
      ([id, label]) => ({ id, label }),
    );
    return [{ id: 'all', label: 'All services' }, ...items];
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const matching =
      selectedServiceId === 'all'
        ? reviews
        : reviews.filter((review) => review.service_id === selectedServiceId);

    return [...matching].sort((a, b) => {
      if (sortOrder === 'highest') {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [reviews, selectedServiceId, sortOrder]);

  const distribution = useMemo<RatingDistributionRow[]>(() => {
    const total = reviews.length;
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((item) => item.rating === stars).length;
      const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
      return { stars, count, percentage };
    });
  }, [reviews]);

  const resetFilters = useCallback(() => {
    setSelectedServiceId('all');
    setSortOrder('newest');
  }, []);

  return {
    serviceOptions,
    selectedServiceId,
    setSelectedServiceId,
    sortOrder,
    setSortOrder,
    filteredReviews,
    distribution,
    resetFilters,
  };
}
