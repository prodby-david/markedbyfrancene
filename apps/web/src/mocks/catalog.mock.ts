import type {
  PortfolioItem,
  PublicReviewsPayload,
  Service,
  ServiceAddon,
  VerifiedReview,
} from '../types/catalog.types';

const sharedAddons: ServiceAddon[] = [
  {
    id: 101,
    service_id: null,
    name: 'Soft Waves or Sleek Updo Hair Styling',
    description: 'Heat-styled hair finish tailored to neckline, veil, or accessories.',
    price_centavos: 80000,
    extra_minutes: 45,
    max_quantity: 1,
    is_active: true,
  },
  {
    id: 102,
    service_id: null,
    name: 'Additional Head (Entourage / Group)',
    description: 'Soft-glam hair and makeup for mothers, bridesmaids, or event guests.',
    price_centavos: 180000,
    extra_minutes: 60,
    max_quantity: 5,
    is_active: true,
  },
  {
    id: 103,
    service_id: null,
    name: 'Early Call Time (Before 6:00 AM PHT)',
    description: 'Dedicated pre-dawn prep or early on-location dispatch.',
    price_centavos: 100000,
    extra_minutes: 0,
    max_quantity: 1,
    is_active: true,
  },
];

export const mockServices: Service[] = [
  {
    id: 1,
    name: 'Signature Hair & Makeup Glam',
    slug: 'signature-hair-and-makeup-glam',
    category: 'Soft Glam',
    description:
      'Refined everyday-to-evening hair and makeup featuring satin skin prep, softly sculpted eyes, and long-wear lip tones for celebrations, graduations, and portraits.',
    duration_minutes: 90,
    base_price_centavos: 180000,
    deposit_centavos: 50000,
    allows_studio: true,
    allows_on_location: true,
    on_location_fee_centavos: 80000,
    is_active: true,
    sort_order: 1,
    addons: sharedAddons,
  },
  {
    id: 2,
    name: 'Bridal Couture Experience',
    slug: 'bridal-couture-experience',
    category: 'Bridal',
    description:
      'Timeless luminous bridal hair and makeup engineered for natural daylight and flash photography, complete with skin prep, individual lash layering, and touch-up notes.',
    duration_minutes: 150,
    base_price_centavos: 950000,
    deposit_centavos: 300000,
    allows_studio: true,
    allows_on_location: true,
    on_location_fee_centavos: 150000,
    is_active: true,
    sort_order: 2,
    addons: [
      {
        id: 201,
        service_id: 2,
        name: 'Pre-Wedding Trial Session (Studio)',
        description: 'Dedicated 90-minute studio preview to finalize tones and lash map.',
        price_centavos: 350000,
        extra_minutes: 0,
        max_quantity: 1,
        is_active: true,
      },
      ...sharedAddons,
    ],
  },
  {
    id: 3,
    name: 'Debut Radiant Glam',
    slug: 'debut-radiant-glam',
    category: 'Debut',
    description:
      'Youthful, breathable complexion artistry with soft rosewood radiance and waterproof eye definition built to stay fresh from pre-debut shoot through the evening program.',
    duration_minutes: 120,
    base_price_centavos: 550000,
    deposit_centavos: 200000,
    allows_studio: true,
    allows_on_location: true,
    on_location_fee_centavos: 120000,
    is_active: true,
    sort_order: 3,
    addons: [
      {
        id: 202,
        service_id: 3,
        name: 'Second Look Retouch',
        description: 'Lip, cheek, and shimmer transition between pre-debut and main gown.',
        price_centavos: 180000,
        extra_minutes: 30,
        max_quantity: 1,
        is_active: true,
      },
      ...sharedAddons,
    ],
  },
  {
    id: 4,
    name: 'Editorial & Campaign Beauty',
    slug: 'editorial-campaign-beauty',
    category: 'Editorial',
    description:
      'Camera-calibrated glass skin, feathered brows, and monochrome editorial color work tailored for lookbooks, brand campaigns, and studio portraits.',
    duration_minutes: 105,
    base_price_centavos: 420000,
    deposit_centavos: 150000,
    allows_studio: true,
    allows_on_location: true,
    on_location_fee_centavos: 120000,
    is_active: true,
    sort_order: 4,
    addons: [
      {
        id: 203,
        service_id: 4,
        name: 'On-Set Standby Hour',
        description: 'Continuous shine control and lip/hair touch-ups during shoot frames.',
        price_centavos: 120000,
        extra_minutes: 60,
        max_quantity: 3,
        is_active: true,
      },
      sharedAddons[0],
      sharedAddons[2],
    ],
  },
];

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    service_id: 2,
    service_name: 'Bridal Couture Experience',
    title: 'Morning Veil Luminance',
    category: 'Bridal',
    caption: 'Satin sunlit complexion with muted rose lips and wispy individual clusters for an intimate garden ceremony.',
    public_url: '/images/hero-editorial.jpg',
    sort_order: 1,
    is_published: true,
  },
  {
    id: 2,
    service_id: 1,
    service_name: 'Signature Hair & Makeup Glam',
    title: 'Warm Bronze Velvet',
    category: 'Soft Glam',
    caption: 'Blended bronze-taupe crease shading paired with hydrated satin skin for an evening reception.',
    public_url: '/images/look-soft-glam.jpg',
    sort_order: 2,
    is_published: true,
  },
  {
    id: 3,
    service_id: 4,
    service_name: 'Editorial & Campaign Beauty',
    title: 'Terracotta Glass Skin',
    category: 'Editorial',
    caption: 'Feathered brows, sculpted cheekbones, and sheer terracotta warmth under directional studio light.',
    public_url: '/images/look-editorial.jpg',
    sort_order: 3,
    is_published: true,
  },
  {
    id: 4,
    service_id: 3,
    service_name: 'Debut Radiant Glam',
    title: 'Champagne Petal Glow',
    category: 'Debut',
    caption: 'Fresh rose-blush draping and soft pearl highlight tailored for an 18th birthday celebration.',
    public_url: '/images/hero-editorial.jpg',
    sort_order: 4,
    is_published: true,
  },
  {
    id: 5,
    service_id: 2,
    service_name: 'Bridal Couture Experience',
    title: 'Timeless Ivory Satin',
    category: 'Bridal',
    caption: 'Humidity-resistant bridal complexion engineered for twelve-hour church and hotel celebrations.',
    public_url: '/images/look-soft-glam.jpg',
    sort_order: 5,
    is_published: true,
  },
  {
    id: 6,
    service_id: 1,
    service_name: 'Signature Hair & Makeup Glam',
    title: 'Evening Rosewood Satin',
    category: 'Soft Glam',
    caption: 'Subtle champagne lid wash balanced with espresso tight-lining and soft rosewood lip stain.',
    public_url: '/images/look-editorial.jpg',
    sort_order: 6,
    is_published: true,
  },
];

const mockReviews: VerifiedReview[] = [
  {
    id: 1,
    booking_id: 401,
    service_id: 2,
    service_name: 'Bridal Couture Experience',
    reviewer_name: 'Camille R.',
    rating: 5,
    comment:
      'My makeup stayed luminous from our 7:00 AM preparation through midnight dancing without feeling heavy once. Every photo looked effortlessly like my own skin on its best day.',
    is_published: true,
    created_at: '2026-10-18T09:30:00Z',
  },
  {
    id: 2,
    booking_id: 402,
    service_id: 3,
    service_name: 'Debut Radiant Glam',
    reviewer_name: 'Bianca M.',
    rating: 5,
    comment:
      'Francene listened carefully to my inspo photos and gave me a soft, fresh debut look that never creased under the ballroom lights. Booking and deposit verification were so calm and clear.',
    is_published: true,
    created_at: '2026-10-29T11:15:00Z',
  },
  {
    id: 3,
    booking_id: 403,
    service_id: 1,
    service_name: 'Signature Hair & Makeup Glam',
    reviewer_name: 'Patricia L.',
    rating: 5,
    comment:
      'Booked hair and makeup for my sister’s wedding in Taguig. Arrived right on schedule, sanitized every brush, and matched my undertone spot-on.',
    is_published: true,
    created_at: '2026-11-04T06:45:00Z',
  },
  {
    id: 4,
    booking_id: 404,
    service_id: 4,
    service_name: 'Editorial & Campaign Beauty',
    reviewer_name: 'Andrea V.',
    rating: 5,
    comment:
      'Cleanest glass-skin finish we have photographed all season. Needed almost zero retouching in post-production.',
    is_published: true,
    created_at: '2026-11-10T04:20:00Z',
  },
  {
    id: 5,
    booking_id: 405,
    service_id: 1,
    service_name: 'Signature Hair & Makeup Glam',
    reviewer_name: 'Denise C.',
    rating: 5,
    comment:
      'Loved the lip shade and how natural the individual lashes felt. Everything from inquiry to session day felt organized and warm.',
    is_published: true,
    created_at: '2026-11-14T08:00:00Z',
  },
];

export function buildMockReviewsPayload(serviceId?: number): PublicReviewsPayload {
  const filtered = serviceId
    ? mockReviews.filter((item) => item.service_id === serviceId)
    : mockReviews;

  const totalCount = filtered.length;
  const averageRating =
    totalCount === 0
      ? 0
      : Number(
          (
            filtered.reduce((sum, item) => sum + item.rating, 0) / totalCount
          ).toFixed(1),
        );

  return {
    summary: {
      average_rating: averageRating,
      total_count: totalCount,
    },
    reviews: filtered,
  };
}
