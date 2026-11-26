import { useMemo } from 'react';
import { useReviewsQuery } from '../../reviews/hooks/useReviewsQuery';

export function useLandingData() {
  const reviewsQuery = useReviewsQuery();

  const topReviews = useMemo(
    () => reviewsQuery.data?.reviews ?? [],
    [reviewsQuery.data],
  );

  return {
    topReviews,
    reviewsLoading: reviewsQuery.isLoading,
  };
}
