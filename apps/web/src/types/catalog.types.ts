export type ServiceCategory =
  | 'Bridal'
  | 'Debut'
  | 'Soft Glam'
  | 'Editorial';

export interface ServiceAddon {
  id: number;
  service_id: number | null;
  name: string;
  description: string | null;
  price_centavos: number;
  extra_minutes: number;
  max_quantity: number;
  is_active: boolean;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  duration_minutes: number;
  base_price_centavos: number;
  deposit_centavos: number;
  allows_studio: boolean;
  allows_on_location: boolean;
  on_location_fee_centavos: number;
  is_active: boolean;
  sort_order: number;
  addons: ServiceAddon[];
}

export interface PortfolioItem {
  id: number;
  service_id: number | null;
  service_name: string | null;
  title: string;
  category: ServiceCategory;
  caption: string | null;
  public_url: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface VerifiedReview {
  id: number;
  booking_id: number;
  service_id: number;
  service_name: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  is_published: boolean;
  created_at: string;
}

export interface ReviewsSummary {
  average_rating: number;
  total_count: number;
}

export interface PublicReviewsPayload {
  summary: ReviewsSummary;
  reviews: VerifiedReview[];
}

export interface PortfolioQueryFilters {
  category?: ServiceCategory | 'All';
  service_id?: number;
}

export interface ReviewsQueryFilters {
  service_id?: number;
}
