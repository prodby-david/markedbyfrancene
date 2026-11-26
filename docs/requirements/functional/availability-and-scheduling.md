# Functional Requirements: Availability and Scheduling

## Scope

Covers Studio Admin schedule configuration (weekly working hours, date blackouts, custom date hours, buffers, and lead-time rules) and public/client querying of bookable time slots.

## Requirements

- **FR-SCH-01 — Recurring Weekly Working Hours:** Studio Admin defines recurring daily availability windows per day of week (`0` Sunday through `6` Saturday) in `Asia/Manila` local time (for example, `08:00` to `18:00`, with optional split blocks).
- **FR-SCH-02 — Date Overrides and Blackouts:** Studio Admin can configure date-specific overrides to mark an entire date as closed (blackout) or replace default weekly hours for that date with custom hours.
- **FR-SCH-03 — Prep and Travel Buffers:** System applies configurable prep/cleanup buffers for `studio` appointments and extended transit/setup buffers for `on_location` appointments when evaluating slot overlaps.
- **FR-SCH-04 — Minimum Advance Notice and Horizon:** System enforces a minimum lead time (for example, 24 hours before `start_at`) and a maximum future booking horizon (for example, 180 days ahead).
- **FR-SCH-05 — Dynamic Open-Slot Endpoint:** Given a target date (`YYYY-MM-DD`), `service_id`, selected add-ons, and `venue_type`, the API calculates and returns available start times in `Asia/Manila` (paired with UTC ISO timestamps) at the configured slot step interval.
- **FR-SCH-06 — Schedule Update Protection:** Modifying weekly hours or adding a blackout date does not silently cancel already `confirmed` or `pending_verification` bookings; conflicting existing bookings are surfaced to the Admin for manual handling.

## Acceptance Criteria

- Slots overlapping any `pending_deposit`, `pending_verification`, or `confirmed` booking's occupied buffered window are excluded from the returned open slots.
- Slots falling inside a blackout date or before the minimum lead-time cutoff are excluded.
- When `on_location` is selected, total required duration plus on-location buffers must fit cleanly within working hours and avoid collisions with neighboring appointments.
