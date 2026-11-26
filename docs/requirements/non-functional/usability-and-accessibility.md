# Non-Functional Requirements: Usability and Accessibility

## Scope

Defines mobile-first booking usability, Philippine localization clarity, and accessibility standards for `apps/web`.

## Requirements

- **NFR-UX-01 — Mobile-First Booking Flow:** All public browsing, slot selection, booking submission, and receipt upload screens must operate seamlessly on `360px`+ mobile viewports without horizontal overflow.
- **NFR-UX-02 — Clear Timezone & Currency Presentation:** All displayed booking dates/times explicitly reflect `Asia/Manila` (`PHT / GMT+8`), and all prices format cleanly in Philippine Peso (`PHP` / `₱`, with two decimals when non-zero centavos exist).
- **NFR-UX-03 — Responsive Feedback & Hold Visibility:** Multi-step booking flows show an explicit itemized summary, hold countdown timer for `pending_deposit` bookings, and clear inline validation messages tied to form inputs.
- **NFR-UX-04 — WCAG 2.1 Level AA Contrast & Semantics:** Text and interactive controls meet WCAG 2.1 AA contrast ratios (`>= 4.5:1` for body text, `>= 3:1` for large text/UI components), use semantic HTML landmarks (`header`, `main`, `nav`, `button`), and support full keyboard navigation with visible focus indicators.
- **NFR-UX-05 — Accessible Status & Error States:** Status badges (`Confirmed`, `Pending Deposit`, `Pending Verification`) pair color cues with explicit text labels and ARIA attributes rather than relying on color alone.
