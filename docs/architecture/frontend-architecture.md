# Frontend Architecture (`apps/web`)

## Technology Stack

- **Runtime & Build:** React 19, TypeScript `~6.0.3`, Vite 8 (`@vitejs/plugin-react`), managed exclusively with `pnpm` (`workspace: web`).
- **Routing:** React Router (`createBrowserRouter` or declarative routes) with route guards separating public, guest-only, client-authenticated, and admin-only routes.
- **Server-State Caching:** TanStack Query managing API queries, request deduplication, cache staleness windows, optimistic/post-mutation cache invalidation, and loading/error states.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (requires `tailwindcss` and `@tailwindcss/vite` `^4.2.2+` for Vite 8 compatibility) with CSS-first `@theme` tokens in `src/index.css`.
- **Linting & Type Rules:** ESLint 10 flat config (`eslint.config.js`) and `tsconfig.app.json` enforcing `verbatimModuleSyntax` (`import type` required) and `erasableSyntaxOnly` (no `enum`, `namespace`, or parameter properties).

## Recommended Module Structure

```text
apps/web/src/
├── api/
│   ├── client.ts          # Credentialed fetch wrapper, CSRF bootstrap, typed errors
│   ├── auth.api.ts        # Auth & session queries/mutations
│   ├── catalog.api.ts     # Services, add-ons, portfolio, reviews queries
│   ├── booking.api.ts     # Availability slots, booking creation, deposits, reschedule
│   └── admin.api.ts       # Admin catalog, schedule, verification, moderation endpoints
├── features/
│   ├── auth/              # AuthContext / session hook, Login, Register, ForgotPassword
│   ├── catalog/           # Services route and service menu listing
│   ├── booking/           # Multi-step booking wizard, slot picker, deposit uploader
│   ├── portfolio/         # Lookbook grid, category filters, lightbox
│   ├── reviews/           # Verified review form and testimonials list
│   └── admin/             # Admin dashboard, verification queue, schedule editor
├── components/            # Shared UI primitives (Button, Badge, Modal, FormField)
├── routes/                # Route tree, ProtectedRoute, AdminRoute
├── lib/                   # Currency (PHP centavos -> formatted PHP) & Asia/Manila formatters
├── index.css              # @import "tailwindcss"; and @theme studio tokens
└── main.tsx               # QueryClientProvider, RouterProvider, Auth bootstrap
```

## TanStack Query Caching Strategy

| Query Domain | Query Key Pattern | `staleTime` Policy | Invalidation Trigger |
| :--- | :--- | :--- | :--- |
| Current Authenticated User | `['auth', 'user']` | `5 minutes` | Login, logout, email verification, profile update |
| Active Services & Add-Ons | `['catalog', 'services']` | `5 minutes` | Admin service/add-on mutations |
| Public Portfolio | `['portfolio', filters]` | `5 minutes` | Admin portfolio publish/edit/delete |
| Public Reviews | `['reviews', filters]` | `2 minutes` | Client review submission, admin moderation |
| Dynamic Open Slots | `['availability', date, serviceId, addonIds, venue]` | `0 ms` (always refetch on mount/focus) | Booking creation, cancel, reschedule, admin schedule edit |
| Client Bookings | `['bookings', 'mine', filters]` | `30 seconds` | Booking create, deposit upload, cancel, reschedule |
| Admin Verification Queue | `['admin', 'bookings', filters]` | `15 seconds` | Approve, decline, re-upload request, mark outcome |

## Direct-to-S3 Upload Integration

1. Client selects a deposit receipt or inspo image in the UI (pre-validated for type/size).
2. Frontend requests a presigned `PUT` URL from `apps/api`.
3. Frontend uploads binary bytes directly to S3 with the signed headers.
4. Frontend sends the returned S3 object key and metadata to `apps/api` to persist the `deposit_proofs` or `booking_inspo_media` record and trigger TanStack Query invalidation.
