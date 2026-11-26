# Actors and Roles

## Actor Summary

| Actor | Auth Requirement | Primary Goal |
| :--- | :--- | :--- |
| Guest Visitor | Unauthenticated | Browse portfolio looks, services, pricing, and verified testimonials. |
| Registered Client | Authenticated (`role = client`) | Reserve time slots, upload deposit proof, attach inspiration photos, reschedule/cancel, and submit reviews. |
| Studio Admin (Francene) | Authenticated (`role = admin`) | Manage catalog, availability, deposit verification, appointment outcomes, portfolio, and review visibility. |
| Queue Worker and Scheduler | Internal system process | Expire unpaid slot holds, dispatch queued emails, and schedule appointment reminders. |

## Detailed Role Boundaries

### Guest Visitor

- Views public landing pages, service packages, add-on options, and public portfolio items.
- Views approved client testimonials.
- Must register or sign in before creating a reservation or viewing personal booking history.

### Registered Client

- Manages own account profile and authentication session.
- Inspects open appointment slots for a selected service, add-ons, and venue type.
- Creates bookings, uploads deposit proof receipts, and attaches optional makeup inspiration images.
- Cancels or reschedules own bookings when permitted by status and cutoff rules.
- Submits one review per `completed` booking.
- Cannot inspect other clients' bookings, receipts, or inspiration images.

### Studio Admin (Francene)

- Full operational control over services, add-ons, weekly working hours, blackout dates, and date overrides.
- Reviews `pending_verification` bookings and inspects private deposit receipts via short-lived signed URLs.
- Approves bookings (`confirmed`), requests receipt re-uploads, or declines bookings (`declined_by_admin`).
- Marks confirmed appointments as `completed` or `no_show`, and can cancel or reschedule bookings overriding client cutoffs.
- Uploads/archives portfolio items and moderates public visibility of client reviews.

### Background Queue Worker and Scheduler

- Executes asynchronous jobs without blocking HTTP request latency.
- Periodically scans `pending_deposit` bookings whose `hold_expires_at` timestamp has elapsed and marks them `expired`.
- Sends transactional booking emails and pre-appointment reminders idempotently.
