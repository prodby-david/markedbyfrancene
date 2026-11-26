# apps/web — Frontend Guidelines

## Stack

- React 19 (`react`, `react-dom`), TypeScript (`~6.0.3`), Vite 8 (`@vitejs/plugin-react`), ESLint 10 flat config (`eslint.config.js`).
- Target routing, server state, and styling: React Router, TanStack Query, and Tailwind CSS v4 (see `docs/architecture/frontend-architecture.md`).
- Entry points: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`.

## Core Principles

    - Inspect the existing code before making changes.
    - Follow existing patterns and conventions.
    - Prefer simple, readable solutions over unnecessary abstractions.
    - Reuse existing components, utilities, and dependencies.
    - Do not introduce new dependencies unless necessary.
    - Keep changes focused on the requested task.
    - Avoid unrelated refactoring.
    - Do not rewrite working code without a clear reason.
    - Preserve existing behavior unless the task explicitly requires changing it.

## Guardrails

- Never store authentication tokens or session secrets in `localStorage` or `sessionStorage`; rely exclusively on Sanctum HTTP-only cookies.
- Never hardcode `localhost` URLs or API origins inside components or feature modules; read `import.meta.env.VITE_API_URL`.
- Never treat client-side price totals or cached slot lists as authoritative; submit raw selections to `apps/api` and handle HTTP `409`/`422` cleanly.
- Never proxy private deposit receipts or inspo image binaries through custom frontend hacks; follow the presigned S3 flow.
- Never use `any` to silence TypeScript errors or bypass `verbatimModuleSyntax` / `erasableSyntaxOnly` compiler checks.
- `[Customize: add prohibited UI dependencies, inline CSS restrictions, or bundle size limits]`

## TypeScript & React Conventions

- Follow strict compiler settings in `tsconfig.app.json` (`verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`):
  - Use `import type` for type-only imports.
  - Avoid non-erasable TypeScript syntax (`enum`, `namespace`, constructor parameter properties); prefer union types or `as const` objects.
- Write functional components and hooks that pass `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- Centralize PHP currency (`centavos` -> `PHP`) and `Asia/Manila` date/time formatters in `src/lib/` rather than formatting ad-hoc inside JSX.
- `[Customize: state feature-folder conventions (src/api/, src/features/, src/components/, src/routes/, src/lib/)]`

## Sanctum SPA & TanStack Query Conventions (Template)

- Centralize HTTP calls in `src/api/client.ts` rather than scattering raw `fetch` calls across components.
- Configure requests to `apps/api` with `credentials: 'include'` and `Accept: application/json`.
- Call `GET /sanctum/csrf-cookie` before login/state-changing requests when no `XSRF-TOKEN` cookie is present, and forward the decoded `XSRF-TOKEN` cookie in the `X-XSRF-TOKEN` header.
- Keep live open-slot queries at `staleTime: 0` and invalidate `['availability']` / `['bookings']` query keys after booking, deposit, reschedule, or cancel mutations.
- `[Customize: adjust TanStack Query staleTime defaults, retry policy, or global 401 redirect behavior]`

## Tailwind CSS v4 & Accessibility Conventions (Template)

- Style with **Tailwind CSS v4** using `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss";` in `src/index.css` (note: Vite 8 requires `tailwindcss` and `@tailwindcss/vite` `^4.2.2+` for peer compatibility).
- Define design tokens (colors, fonts, spacing) with CSS-first `@theme` blocks in `src/index.css` rather than legacy v3 `tailwind.config.*` files or `@tailwind` directives.
- Prefer Tailwind utility classes over custom CSS files or inline `style` objects (use inline styles only for truly dynamic runtime values).
- Ensure mobile-first layouts (`360px`+ viewports), semantic HTML landmarks, keyboard focus visibility, and accessible status text alongside badge colors.
- `[Customize: define UI primitive naming, icon library choice, and form validation library rules]`

## Verification

Run from the repository root (or inside `apps/web` without `--filter web`) after editing frontend files:

- `pnpm --filter web lint`
- `pnpm --filter web build` (runs `tsc -b && vite build`)
- `[Customize: add Vitest / Playwright commands once test suites are introduced]`
