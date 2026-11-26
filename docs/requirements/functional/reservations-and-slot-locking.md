# Functional Requirements: Reservations and Slot Locking

## Scope

Covers booking submission, snapshotting of service/add-on pricing and duration, exclusive slot holds, hold expiration, and client/admin booking retrieval.

## Requirements

- **FR-RES-01 — Reservation Creation:** An authenticated, email-verified client submits a reservation by specifying `service_id`, `start_at`, `venue_type`, optional `venue_address` (required when `venue_type = on_location`), selected add-ons with quantities, and optional client notes.
- **FR-RES-02 — Immutable Booking Snapshots:** Upon creation, the booking persists snapshotted values for service name, unit prices, quantities, travel fee, total price, required deposit amount, total service duration, and occupied buffered timestamps so subsequent catalog edits do not alter the contract.
- **FR-RES-03 — Atomic Slot Hold:** Creating a reservation wraps validation and insertion in a PostgreSQL transaction protected by database exclusion/row locking. The booking begins in `pending_deposit` with a configurable `hold_expires_at` timestamp (for example, 2 hours from creation).
- **FR-RES-04 — Concurrent Conflict Rejection:** If another active booking (`pending_deposit`, `pending_verification`, or `confirmed`) overlaps the requested `[occupied_start_at, occupied_end_at)` window, the API aborts the write and returns HTTP `409 Conflict`.
- **FR-RES-05 — Automatic Hold Expiration:** A scheduled job transitions `pending_deposit` bookings whose `hold_expires_at` has passed (without uploaded deposit proof) to `expired`, releasing the slot for other clients.
- **FR-RES-06 — Client Booking History:** Clients can list and inspect details of their own bookings, filtered by status (`upcoming`, `pending`, `past`, `cancelled`), including payment status, hold countdown, and venue details.
- **FR-RES-07 — Admin Booking Ledger:** Studio Admin can filter and search all bookings across clients by status, date range, venue type, or client name, and update post-appointment outcomes (`completed`, `no_show`).

## Acceptance Criteria

- Two concurrent POST requests targeting overlapping slots result in exactly one HTTP `201` creation and one HTTP `409` conflict response.
- Submitting `venue_type = on_location` without `venue_address` fails validation with HTTP `422`.
- Once a booking reaches `expired`, another client can immediately reserve the freed slot.
