# Functional Requirements: Cancellations and Rescheduling

## Scope

Covers self-service client cancellation and rescheduling rules, configurable notice-window cutoffs, Studio Admin overrides, and slot release/re-lock behavior.

## Requirements

- **FR-CAN-01 — Client Cancellation Rules:** Clients can cancel their own booking when status is `pending_deposit`, `pending_verification`, or `confirmed`, provided `start_at` is still beyond the configured cancellation cutoff window (for example, at least 48 hours prior for `confirmed` bookings; `pending_deposit` and `pending_verification` can be cancelled any time prior to appointment).
- **FR-CAN-02 — Client Cancellation Cutoff Enforcement:** Attempting a self-service client cancellation on a `confirmed` booking inside the cutoff window is rejected with HTTP `422` and instructs the client to contact the Studio Admin directly.
- **FR-CAN-03 — Client Rescheduling Rules:** Clients can reschedule a `pending_deposit`, `pending_verification`, or `confirmed` booking to a new valid open slot before the reschedule cutoff window, preserving the existing booking ID and prior deposit status while re-validating availability and atomically swapping the occupied window.
- **FR-CAN-04 — Reschedule Limit:** System enforces a configurable maximum number of client-initiated reschedules per booking (for example, `1` or `2` reschedules) to prevent indefinite slot churning.
- **FR-CAN-05 — Admin Cancellation and Reschedule Override:** Studio Admin can cancel (`declined_by_admin`) or reschedule any non-terminal booking regardless of cutoff window or reschedule count, with an optional administrative reason note.
- **FR-CAN-06 — Immediate Slot Release:** Cancellation transitions the booking to `cancelled_by_client` or `declined_by_admin` and immediately excludes it from active slot locks.

## Acceptance Criteria

- Rescheduling executes inside a database transaction: if the newly selected slot fails the overlap check, the original slot remains unchanged and HTTP `409` is returned.
- Cancelling a booking releases its occupied window immediately in subsequent open-slot queries.
- Terminal bookings (`completed`, `expired`, `cancelled_by_client`, `declined_by_admin`, `no_show`) cannot be cancelled or rescheduled.
