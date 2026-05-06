## Why

Visitors can currently click the EDM image to reach checkout, but the ordering action is easy to miss after scrolling or when users do not realize the image is interactive. A playful floating order button gives visitors a persistent, obvious path to place an order without changing the EDM-first page structure.

## What Changes

- Add a floating order button on the product page near the right side at roughly one-quarter from the top of the viewport.
- Link the floating button directly to the checkout page at `/checkout`.
- Style the button with a cute, playful treatment while keeping it readable, accessible, and clearly actionable.
- Ensure the floating button remains usable on desktop and mobile without covering important EDM, store information, or map content.
- Preserve the existing EDM image checkout navigation and store information section.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-edm-page`: Extend the product page requirements with a persistent playful floating order action that routes directly to checkout.

## Impact

- Affects the product page route in `src/app/page.tsx` and related global styles in `src/app/globals.css`.
- No API, database, checkout form, order creation, or order-management changes are expected.