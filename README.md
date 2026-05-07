# Scrumptious Shopping Site

React/Next.js single-product shopping flow with checkout, transfer reconciliation, order confirmation, owner order management, PostgreSQL persistence, Prisma migrations, and Docker deployment.

## Stack

- React with Next.js App Router and TypeScript
- PostgreSQL for order persistence
- Prisma for ORM, migrations, and generated client
- Docker Compose for app plus database deployment

## Prerequisites

For local development:

- Node.js and npm compatible with this Next.js project
- PostgreSQL if you want to run the database outside Docker

For Docker deployment:

- Docker with Docker Compose support
- Git for pulling future updates
- Node.js and npm if you want to use the package scripts such as `npm run deploy:docker`

## Environment

Copy `.env.example` to `.env` and adjust values.

```bash
cp .env.example .env
```

App settings:

- `PORT`: application port, default `3000`
- `APP_BASE_URL`: local URL or future production domain, such as `https://shop.example.com`

Database settings:

- `DATABASE_URL`: Prisma connection string for local development outside Docker
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`: Docker PostgreSQL settings

Bank transfer settings:

- `BANK_NAME`, `BANK_BRANCH`, `BANK_ACCOUNT_NAME`, `BANK_ACCOUNT_NUMBER`: transfer information shown at checkout

Product settings:

- `PRODUCT_NAME`, `PRODUCT_DESCRIPTION`, `PRODUCT_UNIT_PRICE`: product information shown on the checkout item row

Admin settings:

- `ORDER_ADMIN_TOKEN`: owner credential for `/admin/orders`; it is submitted through the admin login form and stored as a server-validated HttpOnly session cookie

Do not deploy with the example password or admin token. On Docker deployment, the app container builds its internal `DATABASE_URL` from the `POSTGRES_*` values and connects to the Compose database service.

## Local Development

1. Install dependencies.

```bash
npm install
```

2. Prepare the environment file.

```bash
cp .env.example .env
```

3. Generate the Prisma client.

```bash
npm run db:generate
```

4. If using a local PostgreSQL database, run migrations before starting the app.

```bash
npm run db:migrate
```

5. Start the local Next.js server.

```bash
npm run dev
```

6. Before release or after meaningful changes, run validation.

```bash
npm run test
npm run typecheck
npm run build
```

## New Computer Deployment

Use this flow when moving the project to a new machine or server.

1. Install Git, Docker with Compose support, and Node.js/npm if you plan to use package scripts.

2. Clone the repository and enter the project directory.

```bash
git clone <repository-url>
cd scrumptious
```

3. Create the environment file and replace all production values.

```bash
cp .env.example .env
```

Set at least a real `POSTGRES_PASSWORD`, `ORDER_ADMIN_TOKEN`, bank transfer values, product values including `PRODUCT_UNIT_PRICE`, and `APP_BASE_URL`. If a reverse proxy or domain is already configured, set `APP_BASE_URL` to the public HTTPS origin.

4. Start the Docker deployment.

```bash
npm run deploy:docker
```

The app will start with PostgreSQL and a persistent `postgres_data` volume. During app startup, the container runs `prisma migrate deploy` and then starts Next.js.

If npm is not available on the server, run the equivalent Docker command directly:

```bash
docker compose up --build -d
```

5. Verify the first run.

```bash
docker compose ps
docker compose logs app
```

Open the configured site URL and check `/`, `/checkout`, and `/admin/orders`. The admin page requires the configured owner credential.

## Release And Update Flow

Use this flow each time code changes are ready to deploy.

1. Note the current revision before updating.

```bash
git rev-parse --short HEAD
```

2. Pull the latest code.

```bash
git pull --ff-only
```

3. If `package.json` or `package-lock.json` changed and you use local npm commands, refresh dependencies.

```bash
npm install
```

4. Run validation when the machine has Node.js/npm available.

```bash
npm run test
npm run typecheck
npm run build
```

5. Rebuild and restart the Docker deployment.

```bash
npm run deploy:docker
```

The rebuild uses the latest source. The app container applies pending Prisma migrations with `prisma migrate deploy` before serving traffic.

6. Verify the updated site.

```bash
docker compose ps
docker compose logs app
```

Check `/`, `/checkout`, `/order/<known-order-number>` if you have one, and `/admin/orders`. Confirm checkout still shows the correct product and bank transfer details.

## Operations

For a fixed public IP deployment, use the same root `.env` file and enable the `fixed-ip` Docker Compose profile:

```env
COMPOSE_PROFILES=fixed-ip
SITE_ADDRESS=example.com, www.example.com
APP_BASE_URL=https://example.com
```

After DNS points to the fixed public IP and the router forwards TCP `80` and `443` to the Docker host, deploy with:

```bash
docker compose up --build -d
```

The `proxy` service runs Caddy in Docker, terminates HTTPS, and forwards traffic to the app service on the internal Docker network.

To stop containers:

```bash
npm run docker:down
```

To restart or redeploy after changing `.env`, run:

```bash
npm run deploy:docker
```

To inspect logs:

```bash
docker compose logs app
docker compose logs db
```

When adding a real domain, point the reverse proxy or hosting layer at the configured `PORT`, then set `APP_BASE_URL` to that public domain and redeploy. Verify both the customer routes and `/admin/orders` after the change.

Do not remove the `postgres_data` Docker volume unless you intentionally want to delete stored orders.

## Rollback Notes

If an update fails verification, restore the previous git revision and redeploy:

```bash
git checkout <previous-revision>
npm run deploy:docker
```

Database migrations are applied forward by `prisma migrate deploy`. If a failed update already applied a migration, do not assume the database can be downgraded automatically; inspect the migration and data impact before changing the database.

## Routes

- `/`: EDM product page using only `edm.jpg`
- `/checkout`: customer checkout with transfer information
- `/order/[orderNumber]`: order confirmation
- `/admin/orders`: owner order list and status management