## Context

The repository currently has an empty `src/` folder and two required assets at the workspace root: `edm.jpg` and `logo.jpg`. The change introduces a complete but intentionally small commerce flow: EDM product entry, checkout, order confirmation, and an owner order list. The site needs server-side order persistence because checkout creates records and the owner must later search, sort, and update them.

The selected stack is Next.js with React and TypeScript for the web app, PostgreSQL for persistence, Prisma as the ORM and migration layer, and Docker Compose for deployable local/production-style runtime packaging.

## Goals / Non-Goals

**Goals:**
- Build a responsive single-product shopping flow with four routes: product, checkout, order confirmation, and order management.
- Build the frontend with React using Next.js App Router so page routing, server-side reads/writes, and production builds live in one deployable application.
- Persist orders with customer information, payment reconciliation details, total amount, generated order number, and editable lifecycle status.
- Keep bank transfer information configurable through environment variables so store details can change without code edits.
- Keep application port, public base URL/domain, database connection, product amount, bank transfer information, and owner access token configurable through environment variables.
- Provide Docker-based deployment and package scripts for building, starting, and running the app with its database.
- Use `edm.jpg` as the only product page visual and use `logo.jpg` on checkout and confirmation where it helps brand recognition.
- Provide an owner-friendly order table with search, sorting, status editing, and amount visibility/editing.

**Non-Goals:**
- Multi-product catalog, cart behavior, inventory management, couponing, shipping integrations, or online payment gateway integration.
- Full customer accounts or login history.
- Full admin role management beyond a simple owner access gate for the order list.
- Kubernetes, managed cloud provisioning, or automatic TLS certificate management.

## Decisions

1. Use Next.js App Router with React and TypeScript as the frontend and backend application framework.
   - Rationale: the user asked for React, and Next.js provides React pages, server components, server actions or route handlers, image/static asset handling, and a production Node server in one deployable unit.
   - Alternative considered: Vite React plus a separate Express API. Rejected for the initial build because it adds a second runtime and more deployment wiring without a clear benefit for this small checkout flow.

2. Store orders in PostgreSQL and manage the schema with Prisma ORM.
   - Rationale: the owner workflow depends on stable order identifiers, predictable filtering, reliable status transitions, and future-safe migrations. Prisma gives typed database access and readable migrations without making this small app feel heavy.
   - Suggested fields: `id`, `orderNumber`, `customerName`, `customerPhone`, `customerAddress`, `customerEmail`, `customerNote`, `accountLastFive`, `totalAmount`, `status`, `createdAt`, `updatedAt`.
   - Alternative considered: SQLite. Rejected for deployment because PostgreSQL is better suited for Docker Compose, production persistence, concurrent admin/customer use, and future hosting.
   - Alternative considered: raw SQL without ORM. Rejected because Prisma's generated types and migrations reduce implementation risk for order status and search/update code.

3. Read deployment, transfer, product, and application settings from environment variables.
   - Rationale: bank account information, campaign pricing, product display copy, port binding, database credentials, and eventual domain are operational details that should be editable without source changes.
   - Suggested variables: `PORT`, `APP_BASE_URL`, `DATABASE_URL`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `BANK_NAME`, `BANK_BRANCH`, `BANK_ACCOUNT_NAME`, `BANK_ACCOUNT_NUMBER`, `PRODUCT_NAME`, `PRODUCT_DESCRIPTION`, `PRODUCT_UNIT_PRICE`, `PRODUCT_TOTAL_AMOUNT`, `ORDER_ADMIN_TOKEN`.
   - Alternative considered: hard-coded constants. Rejected because the user explicitly requested env-based transfer information.

4. Keep the product page visually minimal and reserve branding for checkout/confirmation.
   - Rationale: the user requested an EDM-only product page. Checkout and confirmation benefit from a visible logo because they handle trust-sensitive payment and order details.
   - Alternative considered: shared header across every route. Rejected because it would put the logo on the product page.

5. Protect owner order management with a simple configured access token.
   - Rationale: the order list contains customer data and edit controls. A lightweight gate is suitable for the initial owner-only tool while avoiding full auth scope.
   - Alternative considered: no protection. Rejected because customer information and order status editing should not be public.

6. Package deployment with Docker and Docker Compose, and expose commands through `package.json`.
   - Rationale: the user prefers Docker deployment. Compose can run the Next.js app and PostgreSQL together, while `package.json` scripts give one place for local development, production build, migration, and container lifecycle commands.
   - Suggested scripts: `dev`, `build`, `start`, `lint`, `test`, `db:generate`, `db:migrate`, `db:deploy`, `docker:build`, `docker:up`, `docker:down`, and `deploy:docker`.
   - Alternative considered: deploying directly on a host without containers. Rejected because it makes runtime parity and database setup more manual.

## Risks / Trade-offs

- [Risk] Bank transfer orders require manual reconciliation -> Mitigation: require account last five digits and expose it prominently in order management search/results.
- [Risk] A simple access token is weaker than full authentication -> Mitigation: keep the route owner-facing, store the token in env, and treat full auth as a future enhancement.
- [Risk] EDM image dimensions may vary and cause poor responsive layout -> Mitigation: constrain desktop width, set mobile width to 100%, preserve aspect ratio, and avoid overlays on the product page.
- [Risk] Order number collisions could confuse reconciliation -> Mitigation: generate order numbers from a stable prefix plus timestamp/random suffix and enforce uniqueness in storage.
- [Risk] Domain or reverse-proxy settings can produce incorrect absolute URLs -> Mitigation: centralize public URL configuration in `APP_BASE_URL` and keep route navigation relative where possible.
- [Risk] Containers without persistent database volumes can lose orders -> Mitigation: define a named PostgreSQL volume in Docker Compose and document backup as a production operation.

## Migration Plan

1. Scaffold a Next.js React application inside the existing repository.
2. Move or expose `edm.jpg` and `logo.jpg` through the app's public asset path without changing their intended usage.
3. Add environment configuration examples for port, public base URL/domain, transfer info, product amount, PostgreSQL/Prisma database URL, and owner token.
4. Add Dockerfile and Docker Compose configuration for the app and PostgreSQL with a persistent database volume.
5. Add the Prisma order model, generate the client, and initialize migrations.
6. Implement routes and server actions or route handlers, then verify the full order lifecycle in local and Docker runtimes.

## Open Questions

- Exact product price and transfer account details will come from environment variables during implementation.
- Checkout stores product name, unit price, quantity, and computed total so owner-facing order data matches what the customer submitted.
- The initial order status label should be displayed as `訂單成立`; additional statuses can use clear owner-facing labels such as `已收款`, `已出貨`, `已完成`, and `已取消`.
- The future production domain should be set through `APP_BASE_URL` when available; local development can default to `http://localhost:${PORT}`.