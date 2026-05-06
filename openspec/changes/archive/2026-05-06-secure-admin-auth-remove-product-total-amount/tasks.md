## 1. Owner Access Session

- [x] 1.1 Add server-side owner access helpers for credential validation, signed session cookie creation, cookie parsing, and cookie option selection.
- [x] 1.2 Add a POST-based admin login path that validates the configured owner credential, sets an HttpOnly owner session cookie, and redirects to `/admin/orders` without credential query parameters.
- [x] 1.3 Update the admin orders page to authorize from server-validated owner access, render a POST login form when unauthorized, and use search/sort query parameters without carrying any credential.
- [x] 1.4 Update `OrdersManager` so it no longer receives, renders, stores, or sends the owner credential and relies on same-origin cookie credentials for order updates.
- [x] 1.5 Update the admin order update API to authorize from the request cookie/session and reject unauthorized mutations without accepting credentials from headers or request bodies.

## 2. Product Price Configuration

- [x] 2.1 Update environment configuration helpers so product price is read only from `PRODUCT_UNIT_PRICE` and `PRODUCT_TOTAL_AMOUNT` is not used as a fallback.
- [x] 2.2 Verify checkout transfer details, product summary, and order creation continue to compute subtotal and total amount from configured unit price and selected quantity.
- [x] 2.3 Remove `PRODUCT_TOTAL_AMOUNT` from documentation, environment handoff guidance, and any sample configuration maintained by the repo.

## 3. Verification

- [x] 3.1 Add or update tests for owner access success, unauthorized admin page/API behavior, and absence of credential propagation through admin client state.
- [x] 3.2 Add or update tests proving `PRODUCT_UNIT_PRICE` is the sole product price source and totals are computed from unit price times quantity.
- [x] 3.3 Run the relevant validation commands for tests, typechecking, and OpenSpec change validation.