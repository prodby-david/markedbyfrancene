# Workflow: Cancellation and Rescheduling

## Client Cancellation

1. Client clicks **Cancel Booking** on `/bookings/:id` and optionally supplies a reason.
2. `BookingService::cancelByClient()` locks the booking row inside a transaction (`SELECT ... FOR UPDATE`).
3. Eligibility checks:
   - Status must be `pending_deposit`, `pending_verification`, or `confirmed`.
   - If status is `confirmed`, `start_at - now()` must be greater than or equal to the configured cancellation cutoff (for example, `48 hours`). Otherwise return HTTP `422`.
4. Booking transitions to `cancelled_by_client` (`cancellation_reason` recorded), immediately freeing the occupied slot.
5. Enqueue cancellation confirmation email to client and operational notice to Studio Admin.

## Client Rescheduling

1. Client clicks **Reschedule** on `/bookings/:id` and selects a new date/time via `GET /api/availability/slots`.
2. Client submits `POST /api/bookings/{id}/reschedule` with the new `start_at`.
3. `BookingService::rescheduleByClient()` opens a PostgreSQL transaction and locks the booking row:
   - Status must be `pending_deposit`, `pending_verification`, or `confirmed`.
   - `reschedule_count` must be strictly below `max_client_reschedules`.
   - `start_at - now()` must meet the reschedule cutoff window, and the new `start_at` must meet the minimum booking notice (`min_notice_hours`).
4. Server recomputes `[occupied_start_at, occupied_end_at)` from the booking's snapshotted duration and venue buffers, checks working hours/overrides, and updates the booking timestamps and `reschedule_count += 1`.
5. If the new window collides with another active booking, PostgreSQL raises a GiST exclusion error, the transaction rolls back (keeping the original slot intact), and `apps/api` returns HTTP `409 Conflict`.
6. On commit, reset `reminder_24h_sent_at` if the new `start_at` is more than `24 hours` away and enqueue `BookingRescheduledMail`.

## Studio Admin Override

- Studio Admin can cancel (`declined_by_admin`) or reschedule any non-terminal booking through `/api/admin/bookings/{id}/*` ignoring client cutoff windows and reschedule limits, while still enforcing slot conflict checks on reschedule.
