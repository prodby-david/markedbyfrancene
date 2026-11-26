import axios from 'axios';
import type { ApiCollectionResponse } from '../types/api.types';
import type {
  PortfolioItem,
  PortfolioQueryFilters,
  PublicReviewsPayload,
  ReviewsQueryFilters,
  Service,
} from '../types/catalog.types';
import {
  buildMockReviewsPayload,
  mockPortfolioItems,
  mockServices,
} from '../mocks/catalog.mock';
import { apiClient } from './client';

function shouldUseMockByDefault(): boolean {
  return import.meta.env.VITE_USE_MOCK_DATA === 'true';
}

function isUnavailableEndpointError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) {
    return false;
  }
  const status = error.response?.status;
  return !error.response || status === 404 || status === 502 || status === 503;
}

async function fetchWithMockFallback<T>(
  request: () => Promise<T>,
  getFallback: () => T,
): Promise<T> {
  if (shouldUseMockByDefault()) {
    return getFallback();
  }

  try {
    return await request();
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    if (isUnavailableEndpointError(error)) {
      return getFallback();
    }
    throw error;
  }
}

export async function fetchServices(signal?: AbortSignal): Promise<Service[]> {
  return fetchWithMockFallback(
    async () => {
      const response = await apiClient.get<ApiCollectionResponse<Service>>(
        '/api/services',
        { signal },
      );
      return response.data.data;
    },
    () => mockServices,
  );
}

export async function fetchPortfolio(
  filters?: PortfolioQueryFilters,
  signal?: AbortSignal,
): Promise<PortfolioItem[]> {
  return fetchWithMockFallback(
    async () => {
      const params: Record<string, string | number> = {};
      if (filters?.category && filters.category !== 'All') {
        params.category = filters.category;
      }
      if (filters?.service_id) {
        params.service_id = filters.service_id;
      }

      const response = await apiClient.get<ApiCollectionResponse<PortfolioItem>>(
        '/api/portfolio',
        { params, signal },
      );
      return response.data.data;
    },
    () =>
      mockPortfolioItems.filter((item) => {
        const categoryMatch =
          !filters?.category ||
          filters.category === 'All' ||
          item.category === filters.category;
        const serviceMatch =
          !filters?.service_id || item.service_id === filters.service_id;
        return item.is_published && categoryMatch && serviceMatch;
      }),
  );
}

export async function fetchReviews(
  filters?: ReviewsQueryFilters,
  signal?: AbortSignal,
): Promise<PublicReviewsPayload> {
  return fetchWithMockFallback(
    async () => {
      const params: Record<string, number> = {};
      if (filters?.service_id) {
        params.service_id = filters.service_id;
      }

      const response = await apiClient.get<{ data: PublicReviewsPayload }>(
        '/api/reviews',
        { params, signal },
      );
      return response.data.data;
    },
    () => buildMockReviewsPayload(filters?.service_id),
  );
}
