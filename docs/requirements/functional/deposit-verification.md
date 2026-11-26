# Functional Requirements: Deposit Verification

## Scope

Covers client downpayment instructions, deposit proof upload to private storage, and Studio Admin verification outcomes (approve, request re-upload, or decline).

## Requirements

- **FR-DEP-01 — Downpayment Instructions:** Bookings in `pending_deposit` display the required deposit amount in PHP, studio payment channels (bank/e-wallet account details configured on the backend), and the remaining hold expiration time.
- **FR-DEP-02 — Receipt Upload:** The booking owner uploads a deposit proof file (`JPEG`, `PNG`, `WEBP`, or `PDF`, bounded by max file size) along with optional payment reference number and amount note while the booking is in `pending_deposit` and before `hold_expires_at`.
- **FR-DEP-03 — Transition to Pending Verification:** Recording the deposit proof creates a `deposit_proofs` record (`status = pending`) and moves the booking from `pending_deposit` to `pending_verification`, clearing the auto-expiry timer while preserving the slot lock.
- **FR-DEP-04 — Admin Verification Queue:** Studio Admin views all `pending_verification` bookings and inspects uploaded receipts via short-lived private S3 presigned URLs.
- **FR-DEP-05 — Approve Deposit:** Studio Admin marks the deposit proof `approved`, setting `reviewed_by`, `reviewed_at`, and transitioning the booking to `confirmed`.
- **FR-DEP-06 — Request Receipt Re-Upload:** If a receipt is unreadable or incomplete, Studio Admin marks the proof `rejected` with a required `rejection_reason` and returns the booking to `pending_deposit` with a renewed hold window so the client can upload a valid receipt.
- **FR-DEP-07 — Decline Booking:** Studio Admin can permanently decline a booking (`declined_by_admin`) with a required reason, marking the proof `rejected` and immediately releasing the held slot.

## Acceptance Criteria

- Uploading a receipt after `hold_expires_at` or on a non-`pending_deposit` booking returns HTTP `422` or `409`.
- Clients cannot view deposit receipts belonging to other clients; unauthenticated access to receipt URLs is denied.
- Rejecting a deposit proof without providing a `rejection_reason` returns HTTP `422`.
