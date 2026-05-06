## ADDED Requirements

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
- **WHEN** database, bank transfer, product amount, and owner admin token values are configured in the environment
- **THEN** the application uses those values without source code edits

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