## ADDED Requirements

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
- **THEN** the documentation groups and explains app URL or port settings, PostgreSQL settings, bank transfer settings, product display settings, and owner admin token settings

#### Scenario: Maintainer changes the public domain
- **WHEN** a maintainer points the site at a production domain or reverse proxy
- **THEN** the documentation instructs the maintainer to update the public base URL configuration and verify public customer and admin routes