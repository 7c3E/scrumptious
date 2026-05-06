## Why

The current project documents the main commands, but it does not yet provide a complete handoff runbook for development, release, new-computer setup, and post-update operations. This creates avoidable risk when the site needs to be deployed from a fresh machine or updated after code changes.

## What Changes

- Add a clear development workflow covering local setup, environment configuration, database preparation, validation commands, and local run commands.
- Add a release and deployment workflow covering Docker deployment, production environment checks, and service restart expectations.
- Add a new-computer setup flow so a maintainer can clone the project, configure required tools and environment variables, install dependencies, prepare the database, and deploy the site.
- Add an update flow for pulling future changes, applying dependency or migration updates, rebuilding containers, and verifying the running site after each update.
- Document operational checks and rollback-oriented notes without changing runtime behavior.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `deployment-configuration`: Expand documentation requirements to include development workflow, release workflow, fresh-machine deployment, and recurring update procedures.

## Impact

- Affected documentation: `README.md` and any deployment/runbook documentation introduced by the implementation.
- Affected specs: `deployment-configuration`.
- Affected code, APIs, dependencies, and database schema: none expected.