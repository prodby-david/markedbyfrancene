# Functional Requirements: Portfolio and Inspo Media

## Scope

Covers two distinct media domains: public portfolio lookbook publishing by the Studio Admin and private client makeup inspiration image attachments on individual bookings.

## Requirements

- **FR-MED-01 — Public Portfolio Gallery:** Guests and clients can browse published portfolio items filtered by makeup category (for example, Bridal, Debut, Soft Glam, Editorial), displaying CDN-served imagery, look title, optional caption, and linked service reference.
- **FR-MED-02 — Portfolio Management (Admin):** Studio Admin can upload images, assign categories/tags, edit captions, reorder display sequence, and publish/unpublish or delete portfolio items.
- **FR-MED-03 — Portfolio Public Media Optimization:** Portfolio images are stored under the public S3 prefix with immutable content-addressed or UUID keys and delivered via CDN.
- **FR-MED-04 — Client Inspo Photo Attachments:** During booking creation or while a booking is active (`pending_deposit`, `pending_verification`, `confirmed`), the owning client can attach up to a configurable limit (for example, up to `5` images) of makeup inspiration photos with optional style notes.
- **FR-MED-05 — Private Inspo Media Access:** Client inspiration photos are stored under the private S3 prefix and served exclusively via short-lived signed URLs to the owning client and the Studio Admin.
- **FR-MED-06 — Media Upload Validation:** All uploads validate allowed MIME types (`image/jpeg`, `image/png`, `image/webp`) and maximum file size before persistence.

## Acceptance Criteria

- Unpublished portfolio items are hidden from public catalog endpoints and visible only to the Studio Admin.
- A client attempting to view or delete another client's booking inspo image receives HTTP `403`.
- Deleting a portfolio item removes the database record and dispatches S3 cleanup.
