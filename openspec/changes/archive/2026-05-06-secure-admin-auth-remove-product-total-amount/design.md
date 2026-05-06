## Context

The admin orders page currently reads `token` from the query string, renders a GET login form, passes the token into `OrdersManager`, keeps it in hidden search form state, and sends it to the update API through a client-visible header. This protects order data only when the token matches, but it also makes the owner credential easy to expose through URLs, browser history, access logs, or copied links.

Product pricing is configured through `PRODUCT_UNIT_PRICE` with `PRODUCT_TOTAL_AMOUNT` as a fallback in `src/lib/env.ts`. Checkout and order creation already compute totals from unit price and quantity, so keeping a separate product total configuration creates ambiguity without adding useful behavior.

## Goals / Non-Goals

**Goals:**

- Authenticate owner access without placing the configured credential in URLs, hidden fields, client component props, or request bodies after login.
- Keep the owner order list and update API protected by server-validated owner access.
- Keep implementation within the existing Next.js application and environment-variable configuration model.
- Make `PRODUCT_UNIT_PRICE` the only product price configuration used to calculate checkout subtotal, total amount, and persisted order totals.
- Remove `PRODUCT_TOTAL_AMOUNT` from runtime configuration documentation and examples.

**Non-Goals:**

- Introduce multi-user accounts, roles, password reset, or a database-backed identity system.
- Add a new external authentication provider or dependency.
- Change the order schema, payment flow, product quantity behavior, or customer checkout fields.

## Decisions

1. Use a server-issued HttpOnly owner session cookie after a credential POST.

   The admin entry screen will submit the configured owner credential with `POST` to a server route or server action. On success, the server sets an HttpOnly, SameSite cookie that represents owner access and redirects to `/admin/orders` without any credential in the URL. The admin page and update API validate the cookie server-side before reading orders or accepting updates.

   Alternatives considered:

   - Keep query tokens but mask the input: rejected because the URL and hidden form state would still expose the credential.
   - Pass the token only in a fetch header: rejected because the page still needs to deliver the token to client code.
   - Add full account login: rejected because this site only needs a single owner credential and no user management.

2. Sign or otherwise bind the session cookie using server-side secret material.

   The cookie must not be a raw copy of `ORDER_ADMIN_TOKEN`. It can be a signed token derived from the configured owner credential and application secret material, or another server-verifiable value that proves a successful login without exposing the original credential.

   Alternatives considered:

   - Store the raw configured token in the cookie: rejected because cookie disclosure would reveal the credential itself.
   - Store server session state in the database: rejected as unnecessary for a single-owner administrative gate.

3. Make admin mutations rely on cookie credentials.

   `OrdersManager` should no longer receive a token prop or include token hidden inputs. Its fetch calls can use same-origin cookie credentials, while the API route validates owner access from the request cookies.

   Alternatives considered:

   - Keep `x-admin-token`: rejected because client code would still need the credential.

4. Treat `PRODUCT_TOTAL_AMOUNT` as deprecated and remove it from configuration reads.

   `getProductTotalAmount()` should be replaced or simplified so the configured product price comes only from `PRODUCT_UNIT_PRICE`. Transfer info can still display the computed total for the current single default quantity, and checkout/order creation should continue to compute subtotal and total from unit price multiplied by quantity.

   Alternatives considered:

   - Keep `PRODUCT_TOTAL_AMOUNT` as a fallback: rejected because it makes configuration intent unclear and can conflict with computed totals.

## Risks / Trade-offs

- Existing bookmarked admin URLs with `?token=...` stop granting access -> Mitigation: show the login form at `/admin/orders` and redirect successful login back to the clean admin URL.
- Cookie-based owner access requires careful cookie flags -> Mitigation: use HttpOnly and SameSite settings, and set `secure` when running in production.
- A stateless signed cookie cannot be individually revoked before the secret changes -> Mitigation: keep a short reasonable expiration or invalidate sessions when the owner credential changes.
- Removing the `PRODUCT_TOTAL_AMOUNT` fallback may affect deployments that only set that variable -> Mitigation: document `PRODUCT_UNIT_PRICE` as required for product pricing and update environment examples during the same change.

## Migration Plan

1. Add owner session helpers for login validation, session cookie creation, and request-cookie authorization.
2. Convert the admin login from GET query token to POST-based credential verification and redirect.
3. Update the admin page, order manager, and admin API so they rely on server-validated cookies instead of passing tokens through client-visible state.
4. Remove `PRODUCT_TOTAL_AMOUNT` reads and documentation, leaving `PRODUCT_UNIT_PRICE` as the single configured price value.
5. Update tests for owner access and environment parsing, then run typecheck and test validation.

Rollback can restore the previous query-token flow and `PRODUCT_TOTAL_AMOUNT` fallback if needed, but any exposed admin URLs should be considered compromised and the owner credential should be rotated.

## Open Questions

None.