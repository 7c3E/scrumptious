## Context

The repository already exposes the commands needed to develop, build, test, and deploy the shopping site: Next.js commands in `package.json`, Prisma migration commands, and Docker Compose deployment through `docker-compose.yml` and `Dockerfile`. The current README lists these pieces, but it does not yet connect them into a repeatable maintainer workflow.

The requested change is documentation-focused. It should help a maintainer handle normal local development, production release, first-time setup on a new computer, and recurring updates after code changes. The implementation should avoid changing application routes, APIs, Prisma schema, Docker behavior, or package scripts unless documentation uncovers a command that is missing or misleading.

## Goals / Non-Goals

**Goals:**
- Make the README a practical runbook for local development, Docker deployment, fresh-machine setup, and recurring update/release operations.
- Document prerequisites, environment setup, dependency installation, Prisma generation/migrations, validation commands, Docker deployment, and post-update verification.
- Include an update flow that explains how to pull changes, refresh dependencies, apply migrations, rebuild/restart Docker services, and confirm the app and admin route still work.
- Preserve the existing command names and deployment model so current operators do not need to learn a new toolchain.

**Non-Goals:**
- Do not change checkout, order creation, order confirmation, admin order management, public product page behavior, API routes, Prisma models, or database migrations.
- Do not add a new deployment platform, CI/CD service, reverse proxy, backup system, or monitoring stack.
- Do not introduce new dependencies solely for documentation.

## Decisions

- Keep the runbook in `README.md` as the canonical operator entry point. This project is small enough that a separate docs tree would add navigation overhead, while the README is already where setup and deployment information lives.
- Structure the documentation around maintainer workflows instead of implementation components. The sections should answer: how to develop locally, how to deploy from a new computer, how to release/update existing deployment, and how to verify after changes.
- Prefer existing package scripts in examples: `npm install`, `npm run db:generate`, `npm run db:migrate`, `npm run test`, `npm run typecheck`, `npm run deploy:docker`, and `npm run docker:down`. This keeps the runbook aligned with the existing project contract.
- Treat Docker deployment as the production-oriented path. The documented update flow should rebuild the app container and rely on the container startup command to run `prisma migrate deploy` against the Docker database before starting Next.js.
- Document environment variables in operational groups: app URL/port, database, bank transfer fields, product fields, and admin token. This makes fresh-machine setup easier without changing the underlying env loading behavior.

## Risks / Trade-offs

- Documentation can drift from scripts over time -> Keep command examples tied to `package.json` script names rather than duplicating long raw commands.
- Fresh-machine setup depends on local tool installation outside the repo -> Document prerequisites at a high level and avoid OS-specific installer instructions that may become stale.
- Update procedures can vary by hosting machine -> Provide the repo-supported Docker Compose flow and keep reverse proxy/domain instructions as integration notes.
- Rollback without a formal release system is manual -> Document practical rollback direction around restoring the previous git revision and redeploying, while avoiding promises about database downgrade safety.