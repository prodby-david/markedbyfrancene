# apps/api — Backend Guidelines

## Stack & Structure

- Laravel 13 (`^13.0`), PHP `^8.3`, Laravel Sanctum (`^4.0`), PHPUnit 12 (`phpunit/phpunit`), Laravel Pint (`laravel/pint`).
- Database: PostgreSQL (`pgsql` via pgAdmin 4 locally and Neon/Supabase in production; `:memory:` SQLite in starter `phpunit.xml`).
- Routing and middleware are configured in `bootstrap/app.php` (Laravel 13 does not use `app/Http/Kernel.php`).
- Define API endpoints in `routes/api.php` (served under `/api`). Keep `routes/web.php` minimal and do not build SPA views in `resources/views/`.

## Guardrails

- Never use `float` or `double` columns for monetary fields; store integer centavos (`*_centavos`) and compute totals inside backend services.
- Never allow overlapping active bookings (`pending_deposit`, `pending_verification`, `confirmed`) to rely solely on application queries; enforce PostgreSQL transactions, row locks (`SELECT ... FOR UPDATE`), and GiST exclusion constraints.
- Never place complex queries, pricing math, or multi-step booking state transitions inside controllers or route closures.
- Never return raw Eloquent models with sensitive/internal columns directly from controllers; wrap payloads in API Resources.
- Never generate public S3 URLs for `private/deposits/*` or `private/inspo/*` objects; issue short-lived presigned URLs only after policy authorization.
- Never modify already-applied shared migrations; create a new reversible migration instead.
- `[Customize: add endpoint rate limits, max upload sizes, or admin audit log guardrails]`

## Laravel API Conventions (Template)

- **Thin controllers:** Keep controllers under `app/Http/Controllers/Api/` focused on HTTP orchestration.
- **Validation:** Use dedicated `FormRequest` classes (`app/Http/Requests/`) for request validation and input rules rather than inline `$request->validate(...)` on domain endpoints.
- **Responses:** Return Eloquent API Resources (`app/Http/Resources/`) for explicit, stable JSON schemas.
- **Business logic:** Encapsulate domain workflows (availability calculation, pricing, slot locking, deposit verification, media presigning) in focused Services/Actions (`app/Services/` or `app/Actions/`).
- **Authorization:** Enforce ownership and role checks via Laravel Policies (`app/Policies/`) and middleware rather than scattered conditionals.
- **Models & Enums:** Follow `app/Models/User.php` conventions—use PHP 8 attributes (`#[Fillable]`, `#[Hidden]`), `casts()`, and PHP BackedEnums (`app/Enums/`) for booking/proof/user statuses.
- **Migrations & Queues:** Keep `up()` and `down()` reversible, dispatch emails via queued jobs/Mailables (`ShouldQueue`), and design scheduled commands (`routes/console.php`) to be idempotent.
- `[Customize: add naming conventions for Services, Actions, Policies, Jobs, and Mailables]`

## Sanctum SPA & CORS Setup

- Because `apps/web` uses cookie-based Sanctum SPA authentication:
  - Enable stateful API middleware in `bootstrap/app.php` (`$middleware->statefulApi()`).
  - Keep `'supports_credentials' => true` in `config/cors.php` with `'allowed_origins'` reading `env('FRONTEND_URL')` (never use `'*'` when credentials are enabled).
  - Configure `SANCTUM_STATEFUL_DOMAINS` in `config/sanctum.php` / environment config to include the `apps/web` host and port.
  - Protect authenticated routes with `auth:sanctum` (and role middleware/policies for `/api/admin/*`).

## Verification (Template)

Run inside `apps/api` after editing backend files:

- `composer test` (clears config cache and runs PHPUnit feature/unit tests in `tests/`)
- `php vendor/bin/pint --test` (or `php vendor/bin/pint` to apply formatting fixes)
- `[Customize: add PostgreSQL test DB command or PHPStan/Larastan static analysis once configured]`

Add or update PHPUnit feature tests (`tests/Feature/`, extending `Tests\TestCase` with `RefreshDatabase`) for new routes, validation rules, authorization boundaries, and reservation concurrency/state transitions.
