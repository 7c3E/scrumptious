## 1. App Foundation

- [x] 1.1 Scaffold a Next.js App Router application with React, TypeScript, route support, server-side data actions or route handlers, linting, and build scripts.
- [x] 1.2 Expose `edm.jpg` and `logo.jpg` through the app public asset path while preserving the product page EDM-only requirement.
- [x] 1.3 Add environment configuration and examples for `PORT`, `APP_BASE_URL`, `DATABASE_URL`, PostgreSQL credentials, bank name, bank branch, bank account name, bank account number, product total amount, and owner admin token.
- [x] 1.4 Add `package.json` scripts for development, production build/start, lint, test, Prisma generation/migration/deploy, Docker build, Docker up/down, and Docker deployment.

## 2. Order Data Layer

- [x] 2.1 Define the order data model with order number, customer fields, account last five digits, total amount, status, created time, and updated time.
- [x] 2.2 Configure PostgreSQL persistence with Prisma schema, generated client, migrations, and a unique constraint on order number.
- [x] 2.3 Implement order number generation with uniqueness protection and owner-facing status labels including `訂單成立`, `已收款`, `已出貨`, `已完成`, and `已取消`.
- [x] 2.4 Implement shared validation for required customer fields, optional details, account-last-five format, status values, and non-negative total amounts.
- [x] 2.5 Implement server-side order operations for create, read confirmation order, list/search/sort orders, and update order status or total amount.

## 3. Customer Shopping Flow

- [x] 3.1 Implement the product page using only `edm.jpg`, with centered comfortable desktop width, full-width mobile layout, automatic height, and checkout navigation on image activation.
- [x] 3.2 Implement the checkout page with `logo.jpg`, required customer fields, optional email and note fields, configurable transfer information, total amount display, account-last-five input, and create order button.
- [x] 3.3 Connect checkout submission to server-side order creation, show validation or persistence errors without losing form data, and redirect successful submissions to the confirmation page.
- [x] 3.4 Implement the order confirmation page with `logo.jpg`, prominent order number, submitted customer details, total amount, account last five digits, current status, and unknown-order handling.

## 4. Owner Order Management

- [x] 4.1 Implement an owner access gate for the order list using the configured admin token or equivalent owner credential.
- [x] 4.2 Implement the order list with order number, customer information, account last five digits, total amount, status, created time, and updated time.
- [x] 4.3 Add search across order number, customer name, phone number, address, and account last five digits.
- [x] 4.4 Add sorting by created time, updated time, total amount, status, customer name, and order number.
- [x] 4.5 Add owner controls to update each order's status and total amount with validation and persisted updated time.

## 5. Deployment

- [x] 5.1 Add a production Dockerfile for the Next.js React application.
- [x] 5.2 Add Docker Compose configuration for the app and PostgreSQL, including env file loading, configurable `PORT`, and a persistent PostgreSQL volume.
- [x] 5.3 Ensure the production server binds to the configured `PORT` and supports future domain configuration through `APP_BASE_URL`.
- [x] 5.4 Document local and Docker deployment commands in the project README or equivalent setup notes.

## 6. Verification

- [x] 6.1 Add focused tests for validation helpers, order number generation, order creation, order retrieval, order list filtering/sorting, and owner updates.
- [x] 6.2 Verify the full customer flow from product page click through checkout submission to confirmation on desktop and mobile viewports.
- [x] 6.3 Verify the product page shows no logo, checkout and confirmation show the logo, and environment changes update transfer information after restart or redeploy.
- [x] 6.4 Verify Docker deployment starts the app and PostgreSQL, preserves orders across database container restarts, and honors `PORT` and `APP_BASE_URL`.
- [x] 6.5 Run lint, type check, tests, production build, and Docker build successfully.

## 7. Checkout Product Summary Refinement

- [x] 7.1 Add product name, description, unit price, and quantity configuration to checkout/order persistence.
- [x] 7.2 Update checkout UI with centered logo, single-column checkout layout, product information, unit price, quantity controls, subtotal, and total amount.
- [x] 7.3 Display persisted product name, unit price, and quantity on order confirmation and owner order management.
- [x] 7.4 Verify migrations, tests, type check, lint, production build, Docker build, and checkout page rendering after the refinement.