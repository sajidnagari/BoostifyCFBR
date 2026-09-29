# Comment Growth AI

Comment Growth AI is an AI-powered comment intelligence platform that helps users discover high-value commenting opportunities, analyze comment performance, generate personalized responses, and continuously optimize their engagement strategy using real performance data.

## Overview

This repository contains the Comment Growth AI product foundation: a feature-based Next.js workspace, a separate API scaffold, reusable AI/type/database packages, and a responsive intelligence experience backed by clearly labeled local demo data.

## Product Focus

- Discover high-value commenting opportunities
- Analyze post and comment engagement quality
- Generate personalized comments from strategy and expertise
- Learn from performance data and improve future commenting
- Keep AI provider logic abstracted and deterministic business logic separate from UI
- Complete the core discover → analyze → recommend → generate → measure workflow in demo mode

## Monorepo Structure

- apps/web — Next.js frontend
- apps/api — API service
- @companyio/platform-ui — shared UI primitives
- packages/ai — AI provider abstraction and prompts
- packages/database — Prisma schema and database utilities
- packages/types — shared contract types
- packages/config — environment and app settings
- packages/utils — common logic
- docs — product and architecture documentation

## Quick Start

1. Install dependencies:
   pnpm install
2. Run the workspace:
   pnpm dev
3. Build the project:
   pnpm build

## Web Experience

Run the app at `http://localhost:3000`. The product shell contains:

- `/dashboard` — performance overview, trend chart, strategy signals, opportunities, and recent analysis
- `/opportunities` and `/opportunities/[id]` — searchable, ranked feed and opportunity analysis
- `/posts` and `/posts/[id]` — post library and post analysis
- `/comments` and `/comments/[id]` — comment performance and quality analysis
- `/generate` — profile-aware, multi-option comment studio
- `/analytics` — period trends and strategy/topic/comment-shape breakdowns
- `/strategies` — observed strategy performance and guidance
- `/settings/profile` — local expertise/tone profile
- `/settings/accounts` — explicit demo-only account and sync states

Screens use feature-owned services and state. The current records and AI generation are local demo implementations; no social account is authorized, no comments are published, and no live analytics or model provider is connected. The AI package throws for unconfigured provider selections rather than silently presenting demo output as a live provider response.

## Styling

The web app uses Tailwind CSS v4 through Next.js PostCSS (`@tailwindcss/postcss`). Its global stylesheet imports `@companyio/platform-ui/styles.css` and scans `apps/web/app` and `apps/web/features` for app utility classes.

## Environment

Copy the example environment file and update the values for your local environment:

cp .env.example .env

## Development Rules

This project follows the feature-based architecture and strict rules defined in the product specification:

- feature folders must include components, hooks, services, store, types, and constants
- API calls must live in services, not inside page components
- UI code must reuse reusable primitives from the platform UI package
- AI prompts must be stored in the AI package, not in component files
- secrets must remain server-side only

## Roadmap

The interactive demo foundation is implemented. The next production milestones are authentication, persistent profile/content/performance APIs, authorized social ingestion, server-side provider adapters, and integration/e2e tests.
