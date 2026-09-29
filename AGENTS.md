# AGENTS.md

## Project rules

1. Follow feature-based architecture.
2. Every feature must have: components/, hooks/, services/, store/, types/, constants.ts.
3. Never put API calls directly inside page components.
4. Never put feature business logic inside UI components.
5. Reuse platform-ui components.
6. If a reusable UI component is missing, create it in platform-ui first.
7. Do not duplicate components.
8. Feature-specific static data belongs inside the feature.
9. Shared utilities used by multiple applications belong in packages.
10. AI prompts must live inside packages/ai.
11. API keys and secrets must never reach the client.
12. Use TypeScript strictly.
13. Every API request/response must have types.
14. Every feature must own its state.
15. Do not create global state unless genuinely global.
16. Do not modify existing features unnecessarily.
17. Before creating a new component, search platform-ui.
18. Before creating a new utility, search existing packages.
19. Keep business logic testable and independent from UI.
20. Prefer small reusable modules over large files.

## Branch strategy

- main
- develop
- feature/*
- fix/*
- refactor/*

## Commit conventions

- feat: add comment analysis
- feat: add opportunity scoring
- feat: add AI comment generation
- fix: handle duplicate comments
- refactor: improve comment service
- docs: add architecture documentation

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
