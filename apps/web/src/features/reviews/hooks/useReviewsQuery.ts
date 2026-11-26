import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../api/catalog.api';
import { catalogQueryKeys } from '../../../api/queryKeys';
import type { ReviewsQueryFilters } from '../../../types/catalog.types';

const REVIEWS_STALE_TIME_MS = 2 * 60 * 1000;

export function useReviewsQuery(filters?: ReviewsQueryFilters) {
  return useQuery({
    queryKey: catalogQueryKeys.reviews(filters),
    queryFn: ({ signal }) => fetchReviews(filters, signal),
    staleTime: REVIEWS_STALE_TIME_MS,
  });
}
