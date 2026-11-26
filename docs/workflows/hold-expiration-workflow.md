# Workflow: Hold Expiration Sweep

## Trigger

Laravel Scheduler executes `bookings:expire-holds` every minute to clean up unpaid `pending_deposit` reservations whose `hold_expires_at` timestamp has passed.

## Execution Flow

1. **Candidate Selection:** Query bookings where `status = 'pending_deposit'` and `hold_expires_at <= now()` ordered by `hold_expires_at`, selecting IDs in bounded chunks.
2. **Row-Level Lock Per Booking:** For each candidate ID, open a database transaction and fetch the row with `SELECT ... FOR UPDATE SKIP LOCKED` (preventing contention with concurrent worker instances or client deposit uploads).
3. **Re-Verify Eligibility:** Confirm `status === 'pending_deposit'` and `hold_expires_at <= now()` inside the locked transaction (if the client just completed receipt upload and transitioned to `pending_verification`, skip safely).
4. **Transition & Release:** Update `status = 'expired'` and `hold_expires_at = null`. Because the PostgreSQL GiST exclusion constraint applies only to `pending_deposit`, `pending_verification`, and `confirmed`, the slot becomes bookable immediately upon commit.
5. **Notification:** Enqueue `BookingHoldExpiredMail` after transaction commit.

## Idempotency Rules

- Re-running the command immediately finds zero remaining rows with `status = 'pending_deposit'` and `hold_expires_at <= now()`.
- No slot cleanup script or cache flush is required on the backend because slot availability reads active booking statuses directly from PostgreSQL.
