# Backend Architecture (`apps/api`)

## Technology Stack

- **Framework & Runtime:** Laravel 13 (`^13.0`), PHP `^8.3`, Laravel Sanctum 4 (`^4.0`).
- **Bootstrap & Routing:** Configuration lives in `bootstrap/app.php` (routing, stateful API middleware, exception rendering) and `routes/api.php` (`/api/*` endpoints). `routes/web.php` remains minimal.
- **Database & Queue:** PostgreSQL (`pgsql` PDO driver in dev/prod; `:memory:` SQLite available in default `phpunit.xml` or PostgreSQL test database for GiST constraint tests). Queues and sessions use database or Redis drivers as configured by environment.

## Layered Application Structure

```text
apps/api/app/
├── Console/Commands/       # Scheduled commands (expire holds, queue reminders)
├── Enums/                  # PHP BackedEnums (BookingStatus, VenueType, UserRole, ProofStatus)
├── Http/
│   ├── Controllers/Api/    # Thin HTTP controllers (client + admin namespaces)
│   ├── Requests/           # FormRequest validation and input normalization
│   └── Resources/          # Eloquent API Resources shaping explicit JSON payloads
├── Mail/                   # Mailable / Notification templates
├── Models/                 # Eloquent models with #[Fillable], #[Hidden], and casts()
├── Policies/               # Authorization rules (BookingPolicy, ReviewPolicy, etc.)
└── Services/               # Domain services:
    ├── AvailabilityService.php
    ├── BookingService.php
    ├── DepositVerificationService.php
    ├── MediaPresignService.php
    └── PricingService.php
```

## Layer Responsibilities

- **Thin Controllers:** Parse validated `FormRequest` payloads, authorize via Policies or route middleware, invoke a single Service method, and wrap the result in an API Resource or status JSON response.
- **FormRequests:** Validate structural input, MIME constraints, quantity bounds, and `Asia/Manila` date formats before controller invocation.
- **Domain Services:** Encapsulate PostgreSQL transactions, `SELECT ... FOR UPDATE` row locks, integer centavo pricing computation, UTC interval math, and state machine transitions.
- **API Resources:** Guarantee stable JSON response schemas independent of internal database columns, formatting monetary integer centavos and ISO-8601 UTC / `Asia/Manila` fields cleanly.
- **Policies:** Enforce strict ownership (`$booking->user_id === $user->id`) and role checks (`$user->role === UserRole::Admin`) centrally.
- **Scheduler & Queues:** Run `bookings:expire-holds` every minute and `bookings:send-reminders` periodically via Laravel's scheduler (`routes/console.php`), keeping HTTP responses fast.
