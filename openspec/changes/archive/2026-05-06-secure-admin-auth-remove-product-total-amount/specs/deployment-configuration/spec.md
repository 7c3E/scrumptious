## MODIFIED Requirements

### Requirement: Runtime configuration uses environment variables
The system SHALL read deployment and operational settings from environment variables.

#### Scenario: Port is configured
- **WHEN** `PORT` is configured in the environment
- **THEN** the production server listens on that port

#### Scenario: Domain is configured
- **WHEN** `APP_BASE_URL` is configured with a local URL or future production domain
- **THEN** the application uses that base URL for absolute URLs or deployment-aware configuration that requires the public site origin

#### Scenario: Operational settings are configured
- **WHEN** database, bank transfer, product unit price, and owner credential values are configured in the environment
- **THEN** the application uses those values without source code edits

#### Scenario: Product total amount configuration is absent
- **WHEN** `PRODUCT_TOTAL_AMOUNT` is not configured
- **THEN** the application still displays checkout totals and creates orders using `PRODUCT_UNIT_PRICE` and selected quantity

### Requirement: Environment configuration is documented for handoff
The system SHALL document the required environment variable groups so another maintainer can configure the app without source code changes.

#### Scenario: Maintainer prepares environment values
- **WHEN** a maintainer prepares a `.env` file for development or Docker deployment
- **THEN** the documentation groups and explains app URL or port settings, PostgreSQL settings, bank transfer settings, product display settings including `PRODUCT_UNIT_PRICE`, and owner credential settings without requiring `PRODUCT_TOTAL_AMOUNT`

#### Scenario: Maintainer changes the public domain
- **WHEN** a maintainer points the site at a production domain or reverse proxy
- **THEN** the documentation instructs the maintainer to update the public base URL configuration and verify public customer and admin routes