## Why

Visitors currently see only the product EDM and must leave the page flow to find store contact or location details. Adding a consolidated store information area below the EDM lets customers immediately ask about preorders, group buys, and in-person pickup while keeping the existing EDM-first entry point.

## What Changes

- Add a consolidated store information section below the EDM image, inspired by common SHOPLINE-style merchant pages, combining contact details, ordering guidance, and location discovery in one scannable area.
- Include store name, address, phone, credentials, available services, and LINE contact guidance.
- Add immediate ordering/contact actions for phone and LINE inquiries for preorder, group-buy, and corporate orders.
- Include a Google Maps-like embedded map area focused on the store location within the same section.
- Preserve the current EDM image as the primary product visual and keep its checkout navigation behavior.
- Ensure the new section is responsive and readable on desktop and mobile without needing to visually match the reference screenshots exactly.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-edm-page`: Extend the EDM product page requirements to include a consolidated store information section with contact details, ordering contact actions, and a map-style location area below the EDM.

## Impact

- Affects the product page route in `src/app/page.tsx` and related global styles in `src/app/globals.css`.
- May use existing static assets such as `edm.jpg`; no database, checkout API, or order-management changes are expected.
- Uses a browser-supported phone link and embedded map URL; no database, checkout API, or order-management changes are expected.