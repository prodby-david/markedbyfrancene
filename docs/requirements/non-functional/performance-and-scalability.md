# Non-Functional Requirements: Performance and Scalability

## Scope

Defines API response targets, database indexing, frontend caching/bundle efficiency, CDN caching for portfolio media, and asynchronous job offloading.

## Requirements

- **NFR-PRF-01 — API Response Latency:** Public read endpoints (`GET /api/services`, `GET /api/portfolio`, `GET /api/availability/slots`) target under `200 ms` p95 server execution under typical studio concurrency.
- **NFR-PRF-02 — Database Indexing:** PostgreSQL defines targeted indexes on `bookings (occupied_start_at, occupied_end_at)` (GiST partial exclusion index), `bookings (user_id, start_at)`, `bookings (status, hold_expires_at)`, `availability_overrides (date)`, and `reviews (is_published, created_at)`.
- **NFR-PRF-03 — Client Cache & Invalidations:** `apps/web` uses TanStack Query with differentiated `staleTime` policies (longer caching for static catalog/portfolio lists; short/zero `staleTime` for live slot availability) and targeted query invalidation on mutations.
- **NFR-PRF-04 — Edge CDN Media Caching:** Public portfolio images use immutable object keys served from S3 behind a CDN with long-lived `Cache-Control: public, max-age=31536000, immutable` headers and responsive WebP/JPEG sizing.
- **NFR-PRF-05 — Asynchronous Mail & Media Offloading:** Direct client-to-S3 presigned uploads keep large binary payloads off Laravel PHP workers, and outbound emails execute in Laravel background queues rather than during HTTP request lifecycles.
- **NFR-PRF-06 — Bundle Efficiency:** Frontend routes use route-level code splitting where appropriate to keep initial client JS download fast on mobile networks.
