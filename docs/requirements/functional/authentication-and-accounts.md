# Functional Requirements: Authentication and Accounts

## Scope

Covers user account registration, credential login/logout, session hydration, password recovery, email verification, profile updates, and role separation between `client` and `admin`.

## Requirements

- **FR-AUTH-01 — Client Registration:** Guests can create a client account using full name, unique email address, phone number, and password. Newly registered users default to `role = client`.
- **FR-AUTH-02 — Email Verification:** Upon registration, the API dispatches an email verification link via the notification queue. Unverified users cannot finalize a reservation until their email is verified.
- **FR-AUTH-03 — Credential Sign-In and Session Cookie:** Registered users sign in with email and password after initializing a Sanctum CSRF cookie. Successful authentication establishes an HTTP-only session cookie and returns the authenticated user profile and role.
- **FR-AUTH-04 — Session Hydration and Sign-Out:** The SPA hydrates the current user via `GET /api/user` on boot and invalidates the server session on logout.
- **FR-AUTH-05 — Password Reset:** Users can request a time-limited password reset token by email and set a new password, invalidating prior sessions.
- **FR-AUTH-06 — Profile Management:** Authenticated users can update their display name and contact phone number. Role changes cannot be self-assigned through client endpoints.
- **FR-AUTH-07 — Role-Based Access Control:** Admin management endpoints reject any user whose role is not `admin` with HTTP `403`. Client endpoints restrict access strictly to resources owned by the authenticated user.

## Acceptance Criteria

- Attempting to register with an existing email returns HTTP `422` validation errors without leaking sensitive account state beyond uniqueness feedback.
- Logging out clears the active session cookie and causes subsequent protected requests to return HTTP `401`.
- An authenticated `client` calling any `/api/admin/*` route receives HTTP `403`.
