# Workflow: Deposit Verification

## Trigger

A client with a `pending_deposit` booking transfers the required downpayment via bank or e-wallet and uploads the receipt before `hold_expires_at`.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Client as Client Browser
    participant API as apps/api
    participant S3 as Private S3
    participant DB as PostgreSQL
    participant Admin as Studio Admin Browser
    participant Queue as Queue Worker

    Client->>API: POST /api/bookings/{id}/deposit-proof/presign
    API-->>Client: Presigned PUT URL + private object_key
    Client->>S3: PUT receipt image/PDF
    S3-->>Client: 200 OK
    Client->>API: POST /api/bookings/{id}/deposit-proof (object_key, payment_reference)
    API->>DB: Lock booking FOR UPDATE, verify pending_deposit & not expired
    API->>DB: Insert deposit_proofs (pending), set booking status=pending_verification
    API->>Queue: Notify Admin (NewDepositUploadedMail) and Client
    API-->>Client: 201 Created

    Admin->>API: GET /api/admin/bookings?status=pending_verification
    Admin->>API: GET /api/bookings/{id}/deposit-proof/url
    API-->>Admin: 10-min Presigned GET URL
    Admin->>S3: Inspect receipt image/PDF

    alt Valid Receipt
        Admin->>API: POST /api/admin/bookings/{id}/deposit/approve
        API->>DB: Set proof=approved, booking=confirmed
        API->>Queue: Dispatch BookingConfirmedMail
    else Blurry / Incomplete Receipt
        Admin->>API: POST /api/admin/bookings/{id}/deposit/request-reupload (reason)
        API->>DB: Set proof=rejected, booking=pending_deposit (+new hold_expires_at)
        API->>Queue: Dispatch DepositReuploadRequestedMail
    else Fraudulent / Rejected Booking
        Admin->>API: POST /api/admin/bookings/{id}/decline (reason)
        API->>DB: Set proof=rejected, booking=declined_by_admin (slot freed)
        API->>Queue: Dispatch BookingDeclinedMail
    end
```

## Concurrency & Edge-Case Guards

- `apps/api` acquires a `SELECT ... FOR UPDATE` lock on the booking row when recording the receipt, preventing a race condition where the hold-expiration command expires the booking mid-upload.
- Only `pending_deposit` bookings with `hold_expires_at > now()` accept new receipt uploads.
- Rejecting a proof without a clear `rejection_reason` is blocked at request validation (`422`).
