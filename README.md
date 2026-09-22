# CrossGuild

[![CI](https://github.com/idris404/CrossGuild/actions/workflows/ci.yml/badge.svg)](https://github.com/idris404/CrossGuild/actions/workflows/ci.yml)

An end-to-end gaming gear e-commerce platform built with Next.js, TypeScript,
PostgreSQL, Prisma, and Auth.js.

CrossGuild covers the complete storefront workflow—from product discovery and
comparison to account management, cart, checkout, order history, content
management, and back-office reporting. The repository is structured as a
modular monolith and includes automated unit, integration, and browser tests.

> The checkout creates an order but does not process a real payment. A payment
> provider still needs to be integrated before accepting commercial orders.

![CrossGuild product page](docs/assets/crossguild-product-page.png)

## Product scope

- Product catalogue with categories, brands, search, filtering, related items,
  image galleries, wishlists, and product comparison
- Credentials, GitHub, and Google authentication with persistent sessions
- Cart, delivery details, order creation, order history, and cancellation rules
- Ratings and reviews with moderation
- Admin workflows for products, categories, brands, users, orders, reviews, and
  CMS-managed storefront content
- Sales, customer, order, product, profitability, and category reporting
- Transactional email through Resend and media uploads through Cloudinary
- Responsive UI, dark mode, loading states, and accessible component primitives

## Architecture

CrossGuild uses a feature-based modular architecture:

```text
src/
├── app/          # Next.js routes, layouts, route handlers, and thin pages
├── features/     # Domain modules: UI, validation, services, and server logic
├── shared/       # Reusable components, hooks, infrastructure, and types
└── config/       # Application constants
```

Pages delegate domain behaviour to feature modules. API routes validate and
authorize requests before calling server-side domain functions. Prisma is the
single persistence layer, while Zod schemas define input boundaries.

Read [the architecture guide](docs/ARCHITECTURE.md) for dependency rules,
naming conventions, and extension patterns.

## Technology

- Next.js 15 with the App Router
- TypeScript and React 18
- PostgreSQL with Prisma ORM 6
- Auth.js / NextAuth v5 with Prisma Adapter
- Tailwind CSS, shadcn/ui primitives, and Radix UI
- TanStack Query, React Hook Form, and Zod
- Resend for email and Cloudinary for media
- Vitest for unit/integration tests and Playwright for browser E2E tests
- pnpm for deterministic dependency management

## Local setup

### Requirements

- Node.js 20 or newer
- pnpm 11
- PostgreSQL 16 or a compatible managed PostgreSQL database

### Installation

```bash
git clone https://github.com/idris404/CrossGuild.git
cd CrossGuild
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
```

Generate a secure authentication secret and place it in `.env`:

```bash
openssl rand -base64 32
```

Create the database schema and start the development server:

```bash
pnpm prisma:generate
pnpm exec prisma migrate dev
pnpm dev
```

The application is available at [http://localhost:3000](http://localhost:3000).

## Environment configuration

The committed [.env.example](.env.example) is the canonical variable list.
Never commit a populated environment file or use the production database for
local development and E2E tests.

Required for the core application:

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: random secret used to sign authentication tokens
- `AUTH_TRUST_HOST`: set to `true` when running behind the trusted Vercel proxy
- `NEXTAUTH_URL`: canonical application URL, without a trailing slash

Optional integrations must be configured as complete groups:

- GitHub OAuth: `GITHUB_ID` and `GITHUB_SECRET`
- Google OAuth: `GOOGLE_ID` and `GOOGLE_SECRET`
- Resend: `RESEND_API_KEY` and `EMAIL_FROM`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
  `CLOUDINARY_API_SECRET`

Validate a populated environment without printing secret values:

```bash
pnpm check:env
```

## Development commands

```bash
pnpm dev                 # Start the Turbopack development server
pnpm lint                # Run ESLint
pnpm typecheck           # Run TypeScript without emitting files
pnpm test                # Run the Vitest suite once
pnpm test:watch          # Run Vitest in watch mode
pnpm test:e2e            # Run Playwright against a disposable test database
pnpm build               # Create a production Next.js build
pnpm quality             # Reproduce the main local CI quality gate
pnpm db:migrate:deploy   # Apply committed migrations without creating new ones
```

## Continuous integration

The GitHub Actions workflow runs on pushes and pull requests targeting `main`.
It contains two independent quality gates:

1. Prisma schema validation, lint, typecheck, unit/integration tests, and a
   production build.
2. A clean PostgreSQL 16 service, a full replay of every committed migration,
   and Playwright tests in Chromium.

Failed browser runs upload Playwright traces and reports as short-lived CI
artifacts. Enable branch protection for `main` and require both jobs before
merging.

## Production deployment

The repository is configured for Vercel through `vercel.json`. The production
build generates Prisma Client, applies pending migrations with
`prisma migrate deploy`, and then builds Next.js.

Before the first deployment:

1. Create separate PostgreSQL databases for production and preview deployments.
2. Add the required variables from `.env.example` to the matching Vercel
   environments. Do not expose the production database to preview branches.
3. Configure OAuth callback URLs when OAuth is enabled:
   `https://<domain>/api/auth/callback/github` and
   `https://<domain>/api/auth/callback/google`.
4. Verify the sending domain in Resend and configure Cloudinary if the related
   features are enabled.
5. Import the GitHub repository into Vercel and keep the detected Next.js root
   directory at the repository root.
6. After deployment, verify `GET /api/health`, authentication, an admin route,
   product browsing, cart creation, and an order on the production domain.

The health endpoint returns `200 {"status":"ok"}` only when the application can
reach PostgreSQL. It returns `503` without leaking connection details when the
database is unavailable.

## Deployment and security notes

- Production migrations are committed under `prisma/migrations` and are applied
  with `prisma migrate deploy`; `prisma db push` is not a production workflow.
- Security headers disable framing, MIME sniffing, and unnecessary browser
  permissions.
- Development password-reset token tooling returns `404` in production.
- Admin authorization is enforced in middleware and again at protected server
  boundaries.
- Secrets are read only from environment variables and are never required in
  GitHub Actions for CI.
- Run `pnpm audit --prod` during dependency maintenance and review major
  upgrades separately from feature work.

## Additional documentation

- [Architecture and conventions](docs/ARCHITECTURE.md)
- [Refactor plan and completed prompts](docs/REFACTOR_PROMPTS.md)
- [Project evolution article](docs/crossguild-article.md)

## Current limitations

- No payment gateway, refunds, tax engine, or carrier integration
- No stock reservation across concurrent checkouts
- Email and media flows require external provider credentials
- A successful local or CI build does not by itself prove that external OAuth,
  Resend, Cloudinary, or the final production domain are correctly configured

## License

No open-source license has been selected yet. All rights are reserved.
