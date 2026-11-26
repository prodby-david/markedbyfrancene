# Non-Functional Requirements: Reliability and Observability

## Scope

Defines health checks, structured error logging, queue durability, backup expectations, and verification standards.

## Requirements

- **NFR-REL-01 — Health Monitoring Endpoints:** `apps/api` exposes `/api/health` and Laravel `/up` endpoints to verify application liveness and database connectivity in orchestration and uptime checks.
- **NFR-REL-02 — Structured Application Logging:** Security rejections (unexpected CSRF failures), slot-lock conflicts, presigned URL generation errors, and failed mail/expiration jobs emit structured log entries with booking ID and user ID context (excluding credentials or PII payloads).
- **NFR-REL-03 — Queue Retry & Failed Job Recovery:** Queued email and expiration jobs configure bounded retries with exponential backoff and persist unrecoverable failures to Laravel `failed_jobs` for inspection and replay.
- **NFR-REL-04 — Managed Database Backups:** Production PostgreSQL (`Neon` or `Supabase`) maintains automated daily backups and point-in-time recovery aligned with host retention policies; migrations remain reversible (`up()` / `down()`).
- **NFR-REL-05 — Automated Test & Quality Gates:** Backend changes verify feature/unit behavior via PHPUnit (`composer test`) and formatting via Laravel Pint; frontend changes verify lint (`pnpm --filter web lint`) and TypeScript/Vite compilation (`pnpm --filter web build`).
