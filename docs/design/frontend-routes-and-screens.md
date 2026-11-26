# Frontend Routes and Screens (`apps/web`)

## Route Map

| Route | Guard | Screen Purpose |
| :--- | :--- | :--- |
| `/` | Public | Editorial landing page, availability preview, top testimonials, featured looks, and booking overview |
| `/services` | Public | Service menu listing every active package with base rate, duration, and deposit, plus booking and availability CTAs |
| `/portfolio` | Public | Category-filtered makeup lookbook gallery with high-res image modal |
| `/reviews` | Public | Verified client testimonials and aggregate studio rating |
| `/login` | Guest Only | Email/password sign-in via Sanctum SPA cookie flow |
| `/register` | Guest Only | Client account registration |
| `/forgot-password` | Guest Only | Request password reset email |
| `/reset-password` | Guest Only | Complete password reset using email token |
| `/book` | Verified Client | Multi-step reservation builder (Service -> Add-ons & Venue -> Date & Slot -> Review & Hold) |
| `/bookings` | Verified Client | Client booking list filtered by Upcoming, Pending Action, and Past/Cancelled |
| `/bookings/:id` | Verified Client | Booking detail view, hold countdown, deposit upload, inspo attachments, reschedule/cancel, review form |
| `/profile` | Authenticated | Account name, phone update, and verification resend trigger |
| `/admin` | Admin (`role=admin`) | Studio overview (pending verifications count, today's schedule, upcoming bookings) |
| `/admin/bookings` | Admin (`role=admin`) | Full reservation ledger and deposit receipt verification drawer |
| `/admin/services` | Admin (`role=admin`) | Service and add-on CRUD, pricing, and activation toggles |
| `/admin/schedule` | Admin (`role=admin`) | Weekly recurring hours editor and date blackout/override calendar |
| `/admin/portfolio` | Admin (`role=admin`) | Lookbook image uploader, ordering, and publish toggles |
| `/admin/reviews` | Admin (`role=admin`) | Verified review moderation queue (publish/hide) |

## Guard Behavior

- **Unauthenticated access to `/book`, `/bookings*`, `/profile`, or `/admin*`:** Redirects to `/login` preserving intended destination in route state.
- **Unverified client attempting `/book`:** Displays an inline verification prompt with a button calling `POST /api/email/verification-notification`.
- **Non-admin user accessing `/admin*`:** Redirects to `/bookings` (or displays an access denied view) without exposing admin UI chunks or API calls.
