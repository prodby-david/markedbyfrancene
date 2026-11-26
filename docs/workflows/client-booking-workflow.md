# Workflow: Client Booking Creation

## Trigger

An authenticated, email-verified client opens `/book` in `apps/web` to schedule a makeup appointment.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Client as Client (apps/web)
    participant API as apps/api (Laravel)
    participant DB as PostgreSQL
    participant Queue as Queue Worker

    Client->>API: GET /api/services
    API-->>Client: Active services and add-ons (centavos)

    Client->>API: GET /api/availability/slots?date=YYYY-MM-DD&service_id=...&venue_type=...
    API->>DB: Read availability rules, overrides, and active bookings
    API-->>Client: Available start_at slots (Asia/Manila and UTC)

    Client->>API: POST /api/bookings (service, addons, venue, start_at, notes)
    API->>DB: BEGIN TRANSACTION
    API->>DB: Re-validate working hours, cutoff, pricing, and buffers
    API->>DB: INSERT bookings (status=pending_deposit, hold_expires_at=+2h)
    alt Slot taken concurrently (GiST exclusion violation)
        DB-->>API: Exclusion / conflict error
        API-->>Client: 409 Conflict
    else Slot locked cleanly
        DB-->>API: COMMIT
        API->>Queue: Dispatch BookingHoldCreatedMail
        API-->>Client: 201 Created (Booking + deposit instructions)
    end
```

## Operational Steps

1. Client selects a makeup service, optional add-ons/quantities, and venue type (`studio` or `on_location` with venue address).
2. Client picks an available date and start time rendered in `Asia/Manila` (`PHT`).
3. Client reviews the itemized PHP breakdown (base price, add-ons, travel fee, total, and required downpayment) and submits.
4. `apps/api` computes authoritative totals and occupied `[occupied_start_at, occupied_end_at)` bounds on the server inside a PostgreSQL transaction.
5. Upon commit, the booking enters `pending_deposit` with a temporary hold timer (`hold_expires_at`) and displays payment instructions on `/bookings/:id`.
6. If another client claims an overlapping slot milliseconds earlier, PostgreSQL's exclusion constraint blocks the duplicate write and `apps/api` returns HTTP `409 Conflict`, prompting the client to refresh open slots.
