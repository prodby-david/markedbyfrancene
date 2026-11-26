import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../../api/catalog.api';
import { catalogQueryKeys } from '../../../api/queryKeys';

const SERVICES_STALE_TIME_MS = 5 * 60 * 1000;

export function useServicesQuery() {
  return useQuery({
    queryKey: catalogQueryKeys.services,
    queryFn: ({ signal }) => fetchServices(signal),
    staleTime: SERVICES_STALE_TIME_MS,
  });
}
