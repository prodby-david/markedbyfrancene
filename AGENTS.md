# marked-byfrancene

Makeup Reservation web application organized as a two-app monorepo:

- `apps/web`: React 19 + TypeScript + Vite 8 single-page application (workspace package `web` in `pnpm-workspace.yaml`).
- `apps/api`: Laravel 13 + PHP 8.3 JSON API with Laravel Sanctum 4 (Composer project; outside `pnpm-workspace.yaml`).
- `docs/`: Project documentation (`context/`, `requirements/functional/`, `requirements/non-functional/`, `architecture/`, `design/`, `workflows/`, `adr/`).
- `.agents/skills/`: Project-local Antigravity skills (`commit`, `question-answering`).

## Package Managers & Workspace Boundaries

- Use **`pnpm`** (pinned via `packageManager: pnpm@12.21.0`) for root JS tooling and all `apps/web` dependencies and scripts. Do not use `npm` or `yarn` in `apps/web`.
- Use **`composer`** and **`php artisan`** inside `apps/api` for PHP dependencies, migrations, and backend tasks.
- Keep all frontend UI development in `apps/web`. Do not add frontend application pages or assets to `apps/api/resources/` (its `package.json` is only the Laravel starter template).

## Documentation & Source of Truth

- Consult [docs/README.md](docs/README.md) before designing new modules, changing data models, or altering API endpoints.
- Follow existing Architecture Decision Records in `docs/adr/`. If a task changes an architectural decision, record a new ADR rather than silently diverging.
- Keep `docs/` synchronized whenever an endpoint contract, booking state transition, schema rule, or workflow changes.
- `[Customize: list any external docs, Figma links, or Notion/Linear trackers agents should check]`

## Guardrails (Non-Negotiable Rules)

### Security & Secrets
- Never read, modify, or commit `.env` files unless explicitly requested; document new variables as placeholders in `.env.example` (or document them for `apps/web`).
- Never hardcode secrets, S3 credentials, database URLs, or API tokens in source code or documentation.
- Never allow wildcard CORS (`*`) when `supports_credentials` is enabled.
- Never expose `private/` S3 objects (deposit receipts, client inspo media) through public URLs or unauthenticated endpoints.

### Data Integrity & Concurrency
- Never use floating-point types (`float`/`double`) for currency; represent PHP money amounts in integer centavos.
- Never bypass PostgreSQL transactions or slot-locking constraints when creating, rescheduling, uploading receipts for, or expiring bookings.
- Never rely on client-calculated prices, booking totals, or slot availability checks as authoritative; always compute and enforce them server-side.
- Persist booking timestamps in UTC (`timestamptz`) and format studio schedules explicitly in `Asia/Manila`.

### Git & Operational Safety
- Never run destructive database resets (`migrate:fresh`, `db:wipe`), `git reset --hard`, `git push --force`, or `--no-verify` unless explicitly instructed.
- Preserve unrelated working tree edits and avoid touching files outside the requested task scope.
- `[Customize: add project-specific prohibited libraries, endpoints, or deployment guardrails]`

## Cross-App API & Authentication Contract

- `apps/web` authenticates against `apps/api` using **Laravel Sanctum cookie-based SPA authentication** (not bearer tokens).
- Keep cross-origin configuration synchronized between apps:
  - `apps/web` reads the API origin from `VITE_API_URL`.
  - `apps/api` authorizes the SPA origin via `FRONTEND_URL` (`config/cors.php`) and `SANCTUM_STATEFUL_DOMAINS` (`config/sanctum.php`).
  - Authenticated and mutating requests require credentialed HTTP calls, CORS `supports_credentials`, and CSRF cookie initialization (`GET /sanctum/csrf-cookie`).
- Whenever an API endpoint, request payload, or response structure changes in `apps/api`, update the corresponding types and API calls in `apps/web` (or explicitly flag the mismatch).

## Conventions (Template)

### Naming & Structure
- Documentation files: `kebab-case.md` with one focused topic per file; no HTML comments (`<!-- ... -->`) or `TODO`/`TBD` placeholders.
- Database columns and JSON API payload keys: `snake_case` (monetary keys suffixed with `_centavos`, timestamps suffixed with `_at`).
- Frontend components and types: `PascalCase` filenames for React components; `camelCase` for hooks (`use*.ts`) and utility modules.
- `[Customize: add branch naming convention (e.g., feat/<ticket>-<slug>, fix/<slug>)]`
- `[Customize: confirm commit convention (Conventional Commits via .agents/skills/commit)]`

### Domain Policy Defaults (Template)
- Studio timezone: `Asia/Manila` (`UTC+8`); Currency: `PHP` (integer centavos).
- `[Customize: hold expiration duration for pending_deposit bookings (default spec: 2 hours)]`
- `[Customize: minimum booking lead time (default spec: 24 hours) and max future horizon (default spec: 180 days)]`
- `[Customize: client cancellation & reschedule cutoff window (default spec: 48 hours) and max reschedule limit]`
- `[Customize: studio vs. on-location prep/travel buffer minutes]`

### Error Handling & API Responses
- Return explicit HTTP status codes: `401` (unauthenticated), `403` (forbidden), `404` (missing resource), `409` (slot lock or state transition conflict), `422` (validation/business rule violation).
- Format validation and business-rule errors consistently as `{ "message": "...", "errors": { ... } }`.
- `[Customize: add logging/monitoring or custom error code conventions]`

## Agent Workflow & Verification Policy

- Before implementing non-trivial changes, outline affected files, API/schema impacts, and test expectations.
- After code changes, run verification checks for whichever app (`apps/web` or `apps/api`) was modified—or both if an API contract changed—and report the exact commands and observed results.
- Follow the scoped `AGENTS.md` files in `apps/web/` and `apps/api/` for app-specific guardrails, conventions, and verification commands.
- `[Customize: add PR description expectations, screenshot rules, or reviewer checklist items]`
