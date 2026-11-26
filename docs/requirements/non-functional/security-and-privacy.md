# Non-Functional Requirements: Security and Privacy

## Scope

Defines authentication transport protections, authorization isolation, private media security, input hygiene, and abuse controls across `apps/web` and `apps/api`.

## Requirements

- **NFR-SEC-01 — Credentialed Cookie & CSRF Protection:** All authenticated API traffic uses HTTPS, HTTP-only SameSite session cookies via Laravel Sanctum stateful SPA middleware, and CSRF token verification (`X-XSRF-TOKEN`) on state-changing routes.
- **NFR-SEC-02 — Strict CORS Policy:** `config/cors.php` enables `supports_credentials = true` and explicitly restricts `allowed_origins` to `env('FRONTEND_URL')`. Wildcard origins (`*`) are forbidden.
- **NFR-SEC-03 — Authorization Policies:** Every resource endpoint enforces Laravel Policies or middleware guards verifying ownership (`booking.user_id === auth.id`) or `admin` role before returning or mutating data.
- **NFR-SEC-04 — Private Object Storage Isolation:** Deposit receipts and client inspiration images reside under private S3 keys with public access blocked. Access occurs solely via API-authorized presigned URLs expiring within `5–15` minutes.
- **NFR-SEC-05 — Upload Hygiene:** File uploads enforce strict server-side MIME/signature checks, size caps, and randomized UUID storage keys (never trusting client filenames or extensions directly in paths).
- **NFR-SEC-06 — Rate Limiting:** Login, registration, password reset, open-slot queries, and upload URL issuance apply Laravel rate limiters (`throttle`) to mitigate brute-force and resource exhaustion attacks.
- **NFR-SEC-07 — Secret Hygiene:** Credentials, S3 keys, database URLs, and app keys live strictly in environment configuration and are never committed or exposed in API payloads or frontend bundles.
