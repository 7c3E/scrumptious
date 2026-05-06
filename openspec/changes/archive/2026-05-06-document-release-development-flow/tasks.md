## 1. Documentation Audit

- [x] 1.1 Compare existing README commands against `package.json`, `Dockerfile`, `docker-compose.yml`, and `.env.example`.
- [x] 1.2 Confirm the runbook can stay in `README.md` without adding a separate docs directory.

## 2. README Runbook

- [x] 2.1 Expand the environment section into app, database, bank transfer, product, and admin token groups.
- [x] 2.2 Add a local development workflow covering prerequisites, `.env` setup, dependency installation, Prisma preparation, local server startup, and validation commands.
- [x] 2.3 Add a fresh-machine deployment workflow covering repository checkout, environment configuration, Docker availability, deployment startup, and first-run verification.
- [x] 2.4 Add a release/update workflow covering pulling changes, refreshing dependencies when package files change, rebuilding Docker services, applying migrations through the supported deployment path, and verifying the updated site.
- [x] 2.5 Add production domain, reverse proxy, stop/restart, and rollback-oriented operational notes.

## 3. Verification

- [x] 3.1 Verify all documented commands map to existing package scripts or repo-supported files.
- [x] 3.2 Verify documented environment variable names match `.env.example`.
- [x] 3.3 Run OpenSpec status for `document-release-development-flow` and confirm the change remains apply-ready.