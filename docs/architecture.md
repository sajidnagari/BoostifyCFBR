# Architecture

## High-level structure

The project is structured as a pnpm monorepo with a dedicated frontend app, API app, and reusable internal packages.

- apps/web: user-facing Next.js frontend
- apps/api: backend services and route handlers
- packages/platform-ui: shared UI package
- packages/ai: AI provider abstractions and prompts
- packages/database: Prisma and database-specific logic
- packages/types: contract types
- packages/config: app configuration
- packages/utils: shared utilities

## Web Product Structure

The Next.js App Router pages are route adapters. The global `ProductShell` owns the route-aware desktop sidebar, mobile navigation, search overlay, and page transition; feature screens stay under `apps/web/features/<feature>/{components,hooks,services,store,types}`.

The posts feature owns the canonical demo post catalog. Opportunities derive score inputs from that catalog, comments link to those posts, analytics aggregates post/comment records, the dashboard composes those services, and the generation feature consumes a saved expertise profile and the AI package contract. This avoids independent placeholder datasets across screens.

`@companyio/platform-ui` supplies shared interface primitives and the Tailwind v4 stylesheet. The Next app compiles that stylesheet and app utilities through `@tailwindcss/postcss`; the Vite plugin documented by the UI package is for Vite consumers and is not used by this Next app. A maintained pnpm patch exposes the component subpaths consumed by this app.

## Demo And Production Boundaries

- Local demo records are kept in feature services and are explicitly identified in the UI.
- The profile service persists only demo profile preferences in browser local storage.
- Account and sync controls update local demo state and never store OAuth tokens.
- The AI package has a deterministic demo provider; real provider choices fail until server-side adapters and secrets are configured.
- The Express API currently exposes health/summary scaffolding. UI services do not claim that the scaffold is a live content backend.
- Prisma contains the initial domain models; repository migrations, auth ownership, ingestion, and persistent performance history remain production work.

## Principles

- Keep business logic separate from UI
- Use feature directories in the web app
- Prefer deterministic logic over opaque AI control
- Keep provider decisions behind an abstraction layer
- Maintain strong typing across API boundaries
