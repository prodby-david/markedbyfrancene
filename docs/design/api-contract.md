# API Contract

## Global Conventions

- **Base Prefix:** `/api` (plus `/sanctum/csrf-cookie` at root for CSRF cookie initialization).
- **Content Negotiation:** Clients send `Accept: application/json` and `Content-Type: application/json`.
- **Money Format:** All monetary fields end in `_centavos` and return integers (for example, `250000` represents `PHP 2,500.00`).
- **Timestamps:** Request and response instant timestamps use ISO-8601 UTC strings (for example, `2026-12-05T02:00:00Z`), while date-based slot query params (`date=2026-12-05`) represent `Asia/Manila` studio dates.
- **Standard Error Payload:**
  - `401 Unauthenticated` / `403 Forbidden` / `404 Not Found` / `409 Conflict` / `422 Unprocessable Content`:
  ```json
  {
    "message": "The selected time slot is no longer available.",
    "errors": {
      "start_at": ["The selected time slot conflicts with an existing hold or booking."]
    }
  }
  ```

## Endpoint Groups

### Health & Authentication

| Method | Path | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/sanctum/csrf-cookie` | Public | Set `XSRF-TOKEN` cookie for SPA mutations |
| `GET` | `/api/health` | Public | Liveness and service health check |
| `POST` | `/api/register` | Guest | Register client account and trigger verification email |
| `POST` | `/api/login` | Guest | Authenticate session cookie |
| `POST` | `/api/logout` | Authenticated | Invalidate current SPA session |
| `GET` | `/api/user` | Authenticated | Return authenticated user profile and role |
| `PATCH` | `/api/user/profile` | Authenticated | Update user name and phone |
| `POST` | `/api/forgot-password` | Guest | Send password reset email |
| `POST` | `/api/reset-password` | Guest | Reset password with token |
| `POST` | `/api/email/verification-notification` | Authenticated | Resend verification link |

### Public Catalog, Portfolio, Reviews, and Availability

| Method | Path | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/services` | Public | List active services and nested active add-ons |
| `GET` | `/api/services/{slug}` | Public | Retrieve single service details and add-ons |
| `GET` | `/api/availability/slots` | Public | Compute open `Asia/Manila` slots for `date`, `service_id`, `addon_ids[]`, `venue_type` |
| `GET` | `/api/portfolio` | Public | List published portfolio items (filterable by `category`, `service_id`) |
| `GET` | `/api/reviews` | Public | List published verified client reviews and aggregate summary |

### Client Reservations, Media, and Reviews

| Method | Path | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Verified Client | Paginated list of own bookings (filterable by status bucket) |
| `POST` | `/api/bookings` | Verified Client | Create booking hold (`pending_deposit`) atomically |
| `GET` | `/api/bookings/{booking}` | Owner / Admin | View full booking details, price breakdown, and proofs |
| `POST` | `/api/bookings/{booking}/reschedule` | Owner | Move booking to a new valid open slot before cutoff |
| `POST` | `/api/bookings/{booking}/cancel` | Owner | Cancel booking (`cancelled_by_client`) before cutoff |
| `POST` | `/api/bookings/{booking}/deposit-proof/presign` | Owner | Issue private S3 presigned `PUT` URL for receipt upload |
| `POST` | `/api/bookings/{booking}/deposit-proof` | Owner | Record uploaded receipt and move to `pending_verification` |
| `GET` | `/api/bookings/{booking}/deposit-proof/url` | Owner / Admin | Issue short-lived presigned `GET` URL for receipt viewing |
| `POST` | `/api/bookings/{booking}/inspo/presign` | Owner | Issue private S3 presigned `PUT` URL for inspo photo |
| `POST` | `/api/bookings/{booking}/inspo` | Owner | Attach uploaded inspo image metadata to booking |
| `DELETE` | `/api/bookings/{booking}/inspo/{media}` | Owner | Detach and remove client inspo image |
| `POST` | `/api/bookings/{booking}/review` | Owner | Submit verified review for a `completed` booking |

### Studio Admin Endpoints (`/api/admin/*`, `role = admin`)

| Method | Path | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/admin/bookings` | Search and filter all studio reservations |
| `POST` | `/api/admin/bookings/{booking}/deposit/approve` | Approve receipt and confirm booking (`confirmed`) |
| `POST` | `/api/admin/bookings/{booking}/deposit/request-reupload` | Reject proof with reason and return to `pending_deposit` |
| `POST` | `/api/admin/bookings/{booking}/decline` | Decline/cancel booking with reason (`declined_by_admin`) |
| `POST` | `/api/admin/bookings/{booking}/reschedule` | Admin reschedule override ignoring client cutoffs |
| `POST` | `/api/admin/bookings/{booking}/complete` | Transition `confirmed` booking to `completed` |
| `POST` | `/api/admin/bookings/{booking}/no-show` | Transition `confirmed` booking to `no_show` |
| `GET/POST/PATCH/DELETE` | `/api/admin/services`, `/api/admin/addons` | Manage service catalog, pricing, and add-ons |
| `GET/PUT` | `/api/admin/availability/rules` | Manage recurring weekly working hours |
| `GET/POST/DELETE` | `/api/admin/availability/overrides` | Manage date blackouts and custom hours |
| `GET/POST/PATCH/DELETE` | `/api/admin/portfolio` | Publish, update, reorder, or remove portfolio items |
| `GET/PATCH` | `/api/admin/reviews`, `/api/admin/reviews/{review}` | Moderate public visibility of submitted reviews |
