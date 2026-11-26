# Workflow: Artist Schedule Management and Fulfillment

## Weekly Hours & Date Overrides

1. Studio Admin navigates to `/admin/schedule`.
2. **Weekly Rules:** Admin sets active time blocks per weekday (`0..6`) in `Asia/Manila` via `PUT /api/admin/availability/rules`.
3. **Blackouts & Custom Dates:** Admin adds an `availability_overrides` record for holidays, travel days, or special bridal events:
   - `is_closed = true` marks the entire date unavailable for new bookings.
   - `is_closed = false` replaces standard weekday hours with custom `[start_time, end_time]` bounds.
4. **Conflict Warning:** If an override shortens or closes a date that already has `pending_verification` or `confirmed` bookings, `apps/api` preserves those existing bookings and returns a list of affected bookings so Admin can contact clients or reschedule/decline explicitly.

## Appointment Day Fulfillment

1. Admin views the daily agenda on `/admin` or `/admin/bookings` sorted chronologically in `Asia/Manila` (`PHT`), showing client name, service, add-ons, venue address, and inspo photos.
2. After the scheduled appointment time has passed:
   - **Completed:** Admin invokes `POST /api/admin/bookings/{id}/complete`, moving `confirmed` -> `completed`. This immediately enables the client's verified review submission button on `/bookings/:id`.
   - **No-Show:** Admin invokes `POST /api/admin/bookings/{id}/no-show`, moving `confirmed` -> `no_show`. Terminal state; review submission remains blocked.
