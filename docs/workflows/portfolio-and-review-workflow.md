# Workflow: Portfolio Publishing and Client Reviews

## Public Portfolio Publishing (Admin)

1. Studio Admin opens `/admin/portfolio` and uploads a finished makeup photo (`JPEG`, `PNG`, or `WEBP`) with title, category, optional caption, and optional linked `service_id`.
2. `apps/api` validates image dimensions/MIME type, stores the asset at `public/portfolio/{uuid}.{ext}` with `Cache-Control: public, max-age=31536000, immutable`, and saves a `portfolio_items` row with the public CDN URL.
3. Admin toggles `is_published` or adjusts `sort_order`; `apps/web` invalidates `['portfolio']` queries so `/portfolio` reflects changes immediately.
4. Deleting a portfolio item removes the database row and queues S3 object deletion.

## Verified Client Review Flow

1. Once a reservation reaches `completed`, `/bookings/:id` renders the **Leave a Verified Review** form for the owning client.
2. Client submits rating (`1..5`) and written comment to `POST /api/bookings/{id}/review`.
3. `apps/api` verifies `booking.user_id === auth.id`, `booking.status === 'completed'`, and no existing `reviews` row for `booking_id`.
4. The review is saved with `is_published = false` (awaiting Studio Admin moderation) and Admin receives a notification or sees it in `/admin/reviews`.
5. Studio Admin inspects submitted feedback in `/admin/reviews` and toggles `is_published = true` to feature it on `/` and `/reviews` (or keeps it hidden without erasing the verified record).
