import { useQuery } from '@tanstack/react-query';
import { fetchPortfolio } from '../../../api/catalog.api';
import { catalogQueryKeys } from '../../../api/queryKeys';
import type { PortfolioQueryFilters } from '../../../types/catalog.types';

const PORTFOLIO_STALE_TIME_MS = 5 * 60 * 1000;

export function usePortfolioQuery(filters?: PortfolioQueryFilters) {
  return useQuery({
    queryKey: catalogQueryKeys.portfolio(filters),
    queryFn: ({ signal }) => fetchPortfolio(filters, signal),
    staleTime: PORTFOLIO_STALE_TIME_MS,
  });
}
