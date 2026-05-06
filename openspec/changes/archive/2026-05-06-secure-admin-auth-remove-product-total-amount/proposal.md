## Why

The owner order page currently accepts the admin token through the URL query string and carries it through client-visible form state, which can expose the credential through browser history, logs, screenshots, or shared links. The product amount configuration also has overlapping `PRODUCT_UNIT_PRICE` and `PRODUCT_TOTAL_AMOUNT` variables even though checkout totals are computed from unit price and quantity.

## What Changes

- Replace query-string admin token access with a credential flow that does not expose the owner credential in URLs, hidden inputs, or page props.
- Keep admin order pages and update APIs protected by server-validated owner access before customer order data or edit controls are available.
- Remove `PRODUCT_TOTAL_AMOUNT` as a required or documented runtime configuration value.
- Use `PRODUCT_UNIT_PRICE` as the single source for the configured product price, with checkout subtotal and total amount computed from unit price and selected quantity.
- Update handoff documentation and environment examples so maintainers only configure the necessary product price and owner credential values.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `order-management`: Owner authentication must avoid exposing the configured owner credential through URLs or client-visible persisted form state while still protecting order data and updates.
- `checkout-order-creation`: Checkout transfer and product totals must be derived from the configured unit price and selected quantity rather than a separate product total environment variable.
- `deployment-configuration`: Runtime configuration and handoff documentation must no longer require `PRODUCT_TOTAL_AMOUNT`; product pricing should be configured through `PRODUCT_UNIT_PRICE`.

## Impact

- Affected admin page and update API: `src/app/admin/orders/page.tsx`, `src/app/api/admin/orders/[id]/route.ts`, and `src/components/OrdersManager.tsx`.
- Affected configuration helper: `src/lib/env.ts`.
- Affected tests for environment parsing, order creation, and admin access behavior.
- Affected documentation and sample environment guidance in `README.md` and deployment configuration references.