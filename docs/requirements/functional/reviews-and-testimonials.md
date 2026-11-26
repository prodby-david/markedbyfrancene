# Functional Requirements: Reviews and Testimonials

## Scope

Covers verified client review submission tied to completed reservations, Studio Admin moderation, and public display on the marketing/service pages.

## Requirements

- **FR-REV-01 — Verified Review Eligibility:** Only the owning client of a booking whose status is `completed` can submit a review for that booking.
- **FR-REV-02 — Single Review Per Booking:** A booking can have at most one associated review (`unique(booking_id)`). Clients may edit their review before moderation lock if permitted, or submit once cleanly.
- **FR-REV-03 — Rating and Commentary Validation:** Reviews require an integer rating from `1` to `5`, a text comment bounded by length limits, and capture the associated `service_id` for per-service filtering.
- **FR-REV-04 — Admin Moderation:** Newly submitted reviews default to pending/hidden or require moderation visibility control (`is_published` / `status`), allowing the Studio Admin to approve for public display or hide inappropriate content without deleting audit history.
- **FR-REV-05 — Public Testimonials Listing:** Guests and clients can view published reviews alongside reviewer first name/initial, service name, star rating, comment, and aggregate average rating/count.

## Acceptance Criteria

- Attempting to submit a review for a `confirmed`, `pending_deposit`, `cancelled_by_client`, or `no_show` booking returns HTTP `422` or `403`.
- Submitting a second review for the same `booking_id` is rejected with HTTP `409` or `422`.
- Unpublished/hidden reviews do not appear in public API responses or aggregate public rating counts.
