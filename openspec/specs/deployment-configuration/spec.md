# Deployment Configuration Specification

## Purpose
Define how the shopping site is configured, built, deployed, and persisted across local and Docker environments.

## Requirements

### Requirement: App uses React stack
The system SHALL implement the customer and owner web interfaces with React through a full-stack React framework.

#### Scenario: React frontend is scaffolded
- **WHEN** the application source is created
- **THEN** the customer product page, checkout page, order confirmation page, and owner order list are implemented as React-based pages

#### Scenario: Production build is created
- **WHEN** the production build command runs
- **THEN** the system builds a deployable server application for the React-based site

### Requirement: Database uses PostgreSQL with ORM migrations
The system SHALL persist orders in PostgreSQL using an ORM-managed schema and migrations.

#### Scenario: Database schema is initialized
- **WHEN** database migration setup runs against a configured PostgreSQL database
- **THEN** the system creates the order table and supporting constraints needed for unique order numbers and status updates

#### Scenario: Application reads database configuration
- **WHEN** `DATABASE_URL` is configured in the environment
- **THEN** the application uses that connection string for order creation, lookup, listing, search, sort, and updates

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

### Requirement: Docker deployment is available
The system SHALL provide Docker-based deployment for the web application and database.

#### Scenario: Containers are started
- **WHEN** the owner runs the documented Docker deployment command
- **THEN** the system starts the web application and PostgreSQL database with the configured environment variables

#### Scenario: Database persists across container restarts
- **WHEN** the Docker database container restarts
- **THEN** existing order records remain available through a persistent database volume

### Requirement: Package scripts include deployment commands
The system SHALL expose development, build, database, and Docker deployment commands through `package.json` scripts.

#### Scenario: Owner runs local development command
- **WHEN** the owner runs the package development command
- **THEN** the React application starts in local development mode

#### Scenario: Owner runs Docker deployment command
- **WHEN** the owner runs the package Docker deployment command
- **THEN** the system builds or starts the Docker deployment according to the documented script

### Requirement: Operational runbook documents maintainer workflows
The system SHALL document repeatable maintainer workflows for local development, first-time deployment on a new computer, production-oriented Docker release, and recurring updates after code changes.

#### Scenario: Maintainer starts local development
- **WHEN** a maintainer follows the documented local development workflow
- **THEN** the documentation identifies the required environment file setup, dependency installation, Prisma generation or migration commands, local development command, and validation commands

#### Scenario: Maintainer deploys from a new computer
- **WHEN** a maintainer follows the documented fresh-machine deployment workflow
- **THEN** the documentation identifies required local tools, repository checkout, environment configuration, dependency preparation, Docker deployment command, and first-run verification steps

#### Scenario: Maintainer releases or updates an existing deployment
- **WHEN** a maintainer follows the documented update workflow after code changes are available
- **THEN** the documentation identifies the steps to fetch the latest code, refresh dependencies when needed, apply database migrations through the supported deployment path, rebuild or restart Docker services, and verify the updated site

#### Scenario: Maintainer handles a failed update
- **WHEN** a deployment update fails verification
- **THEN** the documentation provides rollback-oriented guidance that uses the previous git revision and redeployment while warning that database downgrades are not automatically guaranteed

### Requirement: Environment configuration is documented for handoff
The system SHALL document the required environment variable groups so another maintainer can configure the app without source code changes.

#### Scenario: Maintainer prepares environment values
- **WHEN** a maintainer prepares a `.env` file for development or Docker deployment
- **THEN** the documentation groups and explains app URL or port settings, PostgreSQL settings, bank transfer settings, product display settings including `PRODUCT_UNIT_PRICE`, and owner credential settings without requiring `PRODUCT_TOTAL_AMOUNT`

#### Scenario: Maintainer changes the public domain
- **WHEN** a maintainer points the site at a production domain or reverse proxy
- **THEN** the documentation instructs the maintainer to update the public base URL configuration and verify public customer and admin routes