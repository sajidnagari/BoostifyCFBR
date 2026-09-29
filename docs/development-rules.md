# Development Rules

## Feature Architecture

Every feature should follow this shape:

- components/
- hooks/
- services/
- store/
- types/
- constants.ts
- index.ts

## UI Rules

- UI components should be reused from the platform-ui package
- If a reusable component does not exist yet, create it in the package first
- Do not create duplicate primitives in feature folders

## API Rules

- Keep all API calls inside service modules
- Never call APIs directly inside page, component, or app entry files
- Use typed request and response interfaces

## Business Logic Rules

- Put business logic into hooks or services
- Keep logic testable and independent from rendering concerns
- Store shared logic in packages/utils when used across apps

## Security Rules

- Never expose secret keys to the frontend
- Keep database credentials and token values server side only
- Follow least-privilege handling for social integrations

## Web Demo Rules

- Keep demo data in feature service modules and label it as demo in the UI.
- Keep route files thin; compose feature components there and keep business logic in hooks/services.
- Use the shared `@companyio/platform-ui` primitives and stylesheet; app-specific layout should use Tailwind utilities rather than parallel component CSS.
- For this Next.js app, compile Tailwind v4 with `@tailwindcss/postcss` and scan both `app/` and `features/` sources.
- Demo account actions must not imply OAuth authorization, publication, or live synchronization.
- Keep all AI prompts in `packages/ai`; browser code may call only an explicitly safe demo adapter until server-side providers are configured.
- Do not run `next dev` and `next build` concurrently against the same app output directory.
