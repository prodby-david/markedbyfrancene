import type {
  PortfolioQueryFilters,
  ReviewsQueryFilters,
} from '../types/catalog.types';

export const catalogQueryKeys = {
  services: ['catalog', 'services'] as const,
  portfolio: (filters?: PortfolioQueryFilters) =>
    ['portfolio', filters ?? {}] as const,
  reviews: (filters?: ReviewsQueryFilters) =>
    ['reviews', filters ?? {}] as const,
};
