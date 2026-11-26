# Environments and Deployment

## Environment Matrix

| Component | Local Development | Automated Testing | Production Target |
| :--- | :--- | :--- | :--- |
| **Frontend (`apps/web`)** | Vite 8 dev server (`http://localhost:5173`) | `eslint .`, `tsc -b && vite build` | Static SPA hosting / Edge CDN (`https://markedbyfrancene.com`) |
| **Backend (`apps/api`)** | PHP built-in / Laravel Serve (`http://localhost:8000`) | PHPUnit 12 (`composer test`) | Managed PHP/Laravel container or PaaS (`https://api.markedbyfrancene.com`) |
| **PostgreSQL** | Local PostgreSQL 16+ managed via **pgAdmin 4** | Ephemeral PostgreSQL test DB (or `:memory:` SQLite for non-GiST unit suites) | **Neon** or **Supabase** managed PostgreSQL (`sslmode=require`) |
| **Object Storage** | Dedicated dev S3 bucket (or MinIO / local S3-compatible endpoint) | Laravel `Storage::fake('s3')` | Amazon S3 private & public prefixes + CDN distribution |
| **Queue & Scheduler** | `php artisan queue:work` + manual/cron `schedule:work` | `QUEUE_CONNECTION=sync` | Dedicated background worker process + 1-minute scheduler cron |
| **Email** | Mailpit / `log` mailer | `MAIL_MAILER=array` | Transactional SMTP / API mailer (Resend, Postmark, or SES) |

## Cross-Domain Production Cookie Alignment

Because Sanctum uses stateful session cookies between `apps/web` and `apps/api`, production deployment shares a root apex domain:

- SPA origin: `https://markedbyfrancene.com` (or `https://app.markedbyfrancene.com`)
- API origin: `https://api.markedbyfrancene.com`
- `SESSION_DOMAIN=.markedbyfrancene.com`
- `SESSION_SECURE_COOKIE=true`
- `FRONTEND_URL=https://markedbyfrancene.com`
- `SANCTUM_STATEFUL_DOMAINS=markedbyfrancene.com`

## Local PostgreSQL and pgAdmin 4 Setup Notes

- Connect `apps/api/.env` with `DB_CONNECTION=pgsql`, pointing to the local PostgreSQL instance inspected via pgAdmin 4.
- Enable the `btree_gist` PostgreSQL extension in migration setup (`CREATE EXTENSION IF NOT EXISTS btree_gist;`) so GiST exclusion constraints on `tstzrange` work identically in local pgAdmin 4 databases and Neon/Supabase production databases.
- Run PHPUnit suites against a dedicated PostgreSQL test database whenever testing migration exclusion constraints and `SELECT ... FOR UPDATE` slot locking, since SQLite does not support PostgreSQL GiST exclusion constraints.
