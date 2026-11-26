# Domain Glossary

| Term | Definition |
| :--- | :--- |
| **Service** | A primary bookable makeup offering (for example, Bridal Glam, Debut Package, or Soft Glam) with a defined duration, base price, and required deposit amount. |
| **Add-On** | An optional enhancement attached to a booking (for example, extra entourage headcount, hair styling, or early-call fee) that adds price and/or extra duration. |
| **Venue Type** | Whether the appointment takes place at `studio` (artist's fixed studio address) or `on_location` (client-supplied event/hotel/home address, incurring travel fee and travel buffer). |
| **Prep/Travel Buffer** | Non-bookable padding added around an appointment's occupied window to cover sanitation, setup, or transit time before and after the session. |
| **Occupied Window** | The full UTC time interval `[occupied_start_at, occupied_end_at)` reserved on the studio calendar, including service duration, add-on duration, and buffers. |
| **Slot Hold** | Temporary reservation lock granted immediately upon booking creation (`pending_deposit`) until `hold_expires_at`, preventing concurrent clients from claiming the same window. |
| **Deposit Proof** | A private image or PDF receipt uploaded by a client showing bank transfer or e-wallet downpayment for admin verification. |
| **Inspo Media** | Optional reference photos uploaded by a client on a booking to communicate desired makeup style, skin tone notes, or look inspiration. |
| **Cutoff Window** | The minimum lead time prior to `start_at` required before an action is disallowed for clients (for example, minimum booking notice or self-service reschedule/cancel cutoff). |
| **Centavos** | Minor currency unit of Philippine Peso (`PHP`), stored as signed/unsigned integers where `100` centavos equals `PHP 1.00` to avoid floating-point rounding errors. |
| **Portfolio Item** | A curated makeup photograph and metadata record published by the Studio Admin to the public lookbook gallery. |
| **Verified Review** | Client rating and feedback strictly tied to a single `completed` booking owned by that client. |
