# Functional Requirements: Service Catalog and Pricing

## Scope

Covers public catalog browsing and Studio Admin management of makeup services, packages, optional add-ons, venue surcharges, and monetary formatting in `PHP`.

## Requirements

- **FR-CAT-01 — Public Service Listing:** Guests and clients can browse active services ordered by display order, showing title, category, description, duration in minutes, base price, required deposit amount, and whether on-location booking is supported.
- **FR-CAT-02 — Service Management (Admin):** Studio Admin can create, update, reorder, activate, and deactivate services. Deactivating a service hides it from new bookings without modifying historical reservations.
- **FR-CAT-03 — Add-Ons and Extra Headcounts:** Services can associate optional add-ons (such as hair styling, extra entourage heads, or early-call fees) with per-unit price, optional quantity bounds (`min_qty`, `max_qty`), and additional minutes added to appointment duration.
- **FR-CAT-04 — Venue Pricing Configuration:** Services specify whether `studio`, `on_location`, or both venue types are allowed, along with configurable base travel fees or travel buffer settings for `on_location` bookings.
- **FR-CAT-05 — Integer Centavos Storage:** All prices, deposit amounts, add-on unit prices, and travel fees are stored and calculated in integer PHP centavos (`100 centavos = PHP 1.00`).
- **FR-CAT-06 — Booking Price Breakdown Preview:** Selecting a service, add-ons with quantities, and venue type returns an accurate breakdown of base price, add-on subtotals, venue travel fee, total price, and required downpayment deposit.

## Acceptance Criteria

- Inactive services and inactive add-ons return HTTP `422` if submitted on a new booking request.
- Existing bookings keep their snapshotted pricing even after the Studio Admin edits or deactivates the underlying service or add-on.
- All monetary computations yield exact integer totals with zero floating-point drift.
