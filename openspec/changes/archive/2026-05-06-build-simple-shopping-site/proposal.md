## Why

This project needs a minimal shopping website that can publish an EDM-based product page, collect customer transfer details, and let the store owner track order status. Building this now establishes the complete order flow before adding richer catalog, payment, or admin features later.

## What Changes

- Add a responsive product page that displays `edm.jpg` only, centered with comfortable desktop margins and full-width mobile behavior.
- Make the product EDM image navigate to checkout when clicked.
- Add a checkout page with customer information fields, configurable bank transfer information from environment variables, an account-last-five input, and order creation.
- Persist created orders with customer data, transfer reconciliation data, total amount, generated order number, and initial status.
- Add an order confirmation page showing the order number and submitted customer information.
- Add an owner-facing order list with searching, sorting, order totals, customer details, and editable order status.
- Display `logo.jpg` on checkout and order confirmation where appropriate, while keeping the product page EDM-only.
- Build the app with a React-based frontend framework and deploy it through Docker with package scripts for local and production deployment.
- Configure runtime settings such as port, public base URL/domain, database connection, and transfer information through environment variables.

## Capabilities

### New Capabilities
- `product-edm-page`: Responsive EDM product page behavior and checkout navigation.
- `checkout-order-creation`: Customer checkout form, transfer information display, and persisted order creation.
- `order-confirmation`: Post-checkout confirmation view with order number and customer details.
- `order-management`: Owner-facing order list, search, sort, totals, and status updates.
- `deployment-configuration`: React app stack, Docker deployment, package scripts, environment-driven port/domain settings, and database platform configuration.

### Modified Capabilities
- None.

## Impact

- Affects the `src/` application structure, React page routes, shared UI components, and form handling.
- Requires persistent order storage using PostgreSQL with Prisma ORM migrations and generated client.
- Requires Dockerfile, Docker Compose configuration, package deployment scripts, and environment examples.
- Requires environment variables for editable bank transfer details, product amount defaults, application port, public base URL/domain, database connection, and owner admin token.
- Uses existing root assets `edm.jpg` and `logo.jpg`.