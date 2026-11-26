# Non-Functional Requirements: Concurrency and Data Integrity

## Scope

Defines transactional guarantees, overlap prevention, temporal precision, financial accuracy, and idempotency rules.

## Requirements

- **NFR-CON-01 — Zero Double-Booking Guarantee:** Overlapping occupied intervals (`[occupied_start_at, occupied_end_at)`) for active bookings (`pending_deposit`, `pending_verification`, `confirmed`) are impossible at the database layer via PostgreSQL GiST `tstzrange` exclusion constraints (`btree_gist`) combined with transactional reservation writes.
- **NFR-CON-02 — Atomic State Transitions:** Status changes (deposit upload vs. hold expiration job; client cancellation vs. admin verification) acquire row-level locks (`SELECT ... FOR UPDATE`) inside database transactions so stale state transitions fail deterministically with HTTP `409 Conflict`.
- **NFR-CON-03 — Temporal Consistency:** All instant timestamps (`start_at`, `end_at`, `occupied_start_at`, `occupied_end_at`, `hold_expires_at`, audit timestamps) are stored in PostgreSQL `timestamptz` (UTC) and converted to `Asia/Manila` strictly at schedule-calculation and presentation boundaries.
- **NFR-CON-04 — Exact Monetary Precision:** All monetary figures (`price_centavos`, `deposit_centavos`, `travel_fee_centavos`, `total_centavos`) use integer arithmetic in Philippine centavos. Floating-point `float`/`double` columns are prohibited for currency.
- **NFR-CON-05 — Immutable Contract Snapshots:** Reservations copy service names, add-on unit prices, durations, and totals at creation time into booking tables so later catalog modifications do not rewrite historical or active bookings.
- **NFR-CON-06 — Job Idempotency:** Hold-expiration sweeps and appointment reminder jobs must execute safely across retries or overlapping scheduler runs without duplicate state regressions or duplicate emails.
