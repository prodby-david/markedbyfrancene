# UI Design System (`apps/web`)

## Aesthetic Direction

**Warm Editorial Luxury Studio** — tailored for bridal, event, and editorial beauty bookings. Visual hierarchy pairs calm, high-contrast typography with soft neutral surfaces, warm rose-blush accents, and crisp photography framing so portfolio imagery and the reservation flow remain the focal point.

## Tailwind CSS v4 Token Architecture

Design tokens are defined in `apps/web/src/index.css` using Tailwind CSS v4 `@theme` directives (no `tailwind.config.js`).

```css
@import "tailwindcss";

@theme {
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  --color-cream: #faf7f4;
  --color-sand: #f2ebe4;
  --color-blush-100: #f9e6e8;
  --color-blush-400: #d99aa3;
  --color-rosewood: #8f4a56;
  --color-espresso: #261d1b;
  --color-taupe: #6f625d;
  --color-champagne: #c8a26a;
  --color-border-warm: #e4d8cf;
}
```

## Typography and Hierarchy

- **Display Headings (`--font-display`):** Hero titles, section headers, and service package names with generous tracking and balanced line heights (`1.15–1.25`).
- **UI & Body Copy (`--font-sans`):** Form controls, pricing breakdowns, time slots, status badges, and reservation tables (`>= 14px`–`16px` body size for comfortable mobile legibility).
- **Tabular Numerals:** Apply `tabular-nums` to all PHP currency amounts, slot times, and hold countdown timers so stacked values align vertically.

### Type Scale

| Role | Classes |
| :--- | :--- |
| Section and page title | `font-display text-5xl font-normal italic leading-none tracking-[-0.02em] sm:text-6xl lg:text-7xl` (lowercase copy) |
| Statement headline | `font-display text-5xl font-normal italic leading-[1.02] sm:text-6xl` (long sentence headlines only, such as the booking CTA) |
| Lead paragraph | `text-sm leading-relaxed sm:text-base` with `text-taupe` on light surfaces and `text-cream/80` on dark surfaces |
| Item heading | `font-sans text-base font-bold tracking-tight` |
| Meta and captions | `text-xs text-taupe` (or `text-cream/80` on dark surfaces) |
| Buttons | Shared `getButtonClassName` styles: uppercase, `tracking-wide`, `text-xs` (`sm`) or `text-sm` (`md`, `lg`) |

## Radius Scale

- **`rounded-md` (6px):** Buttons, cards, panels, inputs and selects, calendar day cells, FAQ items, image frames, dialogs, and skeleton loaders.
- **`rounded-full`:** Badges, filter chips, round icon buttons overlaid on imagery, rating bars, and counters.
- **`rounded-sm` (4px):** Tiny indicators under 16px, such as calendar legend swatches.
- Do not override button radius per call site; change `buttonStyles.ts` instead.

## Color Usage

- Body copy on `bg-espresso` surfaces uses `text-cream/80`.
- Contact and meta icons use `text-rosewood` as the accent.

## Core Component Patterns

- **Slot Picker Buttons:** Clear visual differentiation across `available` (warm border, crisp hover), `selected` (espresso/rosewood fill, high-contrast light text), and `disabled/unavailable` (muted surface, explicit `disabled` attribute).
- **Status Badges:** Pair distinct semantic colors with unambiguous status labels (`Pending Deposit`, `Verifying Deposit`, `Confirmed`, `Completed`, `Cancelled`, `Declined`, `Expired`).
- **Sticky Mobile Booking Summary:** On narrow screens during multi-step booking, display selected service, date/time (`PHT`), total price, and required deposit in an expandable summary bar.
- **Photography Aspect Ratios:** Enforce uniform aspect ratios (`aspect-[4/5]` for portrait lookbook cards) with subtle skeleton loaders while CDN images load.
- **Form Fields:** Visible label above the field (`htmlFor`), `h-12` (`48px`) `rounded-md` input with `16px` (`text-base`) text and `caret-rosewood`, `border-border-warm` default and `border-rosewood` with `text-xs text-rosewood` error text when invalid, `text-xs text-taupe` hints, on-blur + on-submit validation, focusable `role="alert"` error summary with field anchor links, show/hide toggle on password fields, and never block paste.
