# Slot Calculation Algorithm

## Inputs

- `date`: Studio local date (`YYYY-MM-DD` in `Asia/Manila`).
- `service`: Active `services` row providing `duration_minutes`.
- `addons`: Selected active `service_addons` with quantities contributing `sum(extra_minutes * quantity)`.
- `venue_type`: `'studio'` or `'on_location'`.
- Studio configuration constants:
  - `slot_step_minutes` (for example, `30` minutes)
  - `min_notice_hours` (for example, `24` hours)
  - `max_horizon_days` (for example, `180` days)
  - `studio_buffer_before_minutes` / `studio_buffer_after_minutes` (for example, `15` / `15`)
  - `on_location_buffer_before_minutes` / `on_location_buffer_after_minutes` (for example, `45` / `45` for travel)

## Step-by-Step Computation

1. **Validate Horizon:** Confirm `date` in `Asia/Manila` lies within `[today, today + max_horizon_days]`. If outside, return an empty list.
2. **Determine Working Windows for `date`:**
   - Query `availability_overrides` for `date`.
   - If an override exists and `is_closed = true`, return an empty list.
   - If an override exists and `is_closed = false`, use `[override.start_time, override.end_time]` as the working window.
   - Otherwise, query active `availability_rules` matching `day_of_week(date)` in `Asia/Manila`.
3. **Compute Total Session and Occupied Lengths:**
   - `session_minutes = service.duration_minutes + sum(addon.extra_minutes * quantity)`
   - Select `(buffer_before, buffer_after)` based on `venue_type`.
4. **Query Conflicting Occupied Windows:**
   - Convert working window day boundaries `[date 00:00:00 PHT, date 23:59:59 PHT]` (expanded by buffer bounds) to UTC.
   - Fetch all `bookings` rows where `status IN ('pending_deposit', 'pending_verification', 'confirmed')` and `occupied_end_at > day_start_utc` and `occupied_start_at < day_end_utc`.
5. **Generate and Filter Candidate Start Times:**
   - For each working window `[win_start, win_end]`, iterate candidate local start times `t` in increments of `slot_step_minutes` where:
     - `t >= now('Asia/Manila') + min_notice_hours`
     - `t >= win_start` and `t + session_minutes <= win_end`
   - For each candidate `t`, compute UTC `cand_occ_start = utc(t - buffer_before)` and `cand_occ_end = utc(t + session_minutes + buffer_after)`.
   - Exclude `t` if any active booking satisfies `booking.occupied_start_at < cand_occ_end AND booking.occupied_end_at > cand_occ_start`.
6. **Return Available Slots:** Emit surviving candidate start times containing `start_at_manila` (for display) and `start_at_utc` (for booking submission).

## Server Re-Verification on Write

`BookingService::create()` never trusts a pre-fetched slot list from the browser. Inside a PostgreSQL transaction, it re-runs steps 1–5 for the requested `start_at` and validates against the GiST exclusion constraint before committing.
