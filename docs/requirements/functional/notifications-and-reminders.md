# Functional Requirements: Notifications and Reminders

## Scope

Covers asynchronous email notifications triggered by booking lifecycle events and scheduled pre-appointment reminders dispatched via Laravel queues.

## Requirements

- **FR-NOT-01 — Transactional Booking Lifecycle Emails:** System dispatches queued email notifications to the client for key events:
  - Booking hold created (`pending_deposit`, including deposit amount, payment instructions, and hold expiry deadline).
  - Deposit proof received (`pending_verification`).
  - Booking confirmed (`confirmed`, including appointment date/time in `Asia/Manila` and venue address).
  - Deposit proof re-upload requested (including admin rejection reason and new hold deadline).
  - Booking declined or cancelled (`declined_by_admin`, `cancelled_by_client`).
  - Booking rescheduled (showing previous and new `Asia/Manila` date/time).
  - Slot hold expired (`expired`).
- **FR-NOT-02 — Admin Operational Alerts:** System notifies Studio Admin by email when a new deposit proof is uploaded (`pending_verification`) or when a client cancels/reschedules a confirmed booking.
- **FR-NOT-03 — Pre-Appointment Reminders:** Scheduler dispatches reminder emails for `confirmed` appointments at configured intervals prior to `start_at` (for example, `24 hours` before appointment).
- **FR-NOT-04 — Idempotent Reminder Tracking:** System records sent reminder markers (for example, `reminder_24h_sent_at`) so scheduler reruns or worker retries never send duplicate reminders for the same booking and interval.

## Acceptance Criteria

- HTTP booking and admin verification endpoints enqueue notification jobs rather than blocking on synchronous SMTP calls.
- Rescheduling a `confirmed` booking clears/resets pending reminder tracking when the new `start_at` moves outside the already-reminded window.
- Cancelled, declined, expired, and `no_show` bookings never receive upcoming appointment reminders.
