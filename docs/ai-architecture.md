# AI Architecture

## Goals

- Separate AI orchestration from app logic
- Keep provider logic behind a consistent interface
- Manage prompts in a central package
- Support future providers without changing business logic

## Provider Abstraction

The AI package exposes a provider-neutral interface for:

- analyzePost
- analyzeComment
- generateComment
- generateStrategy

It should allow multiple providers such as OpenAI and Anthropic while preserving a stable public API.

The current web generation workflow uses the explicit `demo` provider. It returns three profile-aware deterministic options for interaction testing; it does not call a hosted model. `openai` and `anthropic` selections throw until server-only adapters and secret configuration are implemented. Never move API keys or provider calls into client components.

## Prompt Management

All prompts live under `packages/ai/src/prompts` and are owned by the AI orchestration layer, not React components. A production provider adapter still needs to consume these prompts and validate structured output.

## Recommendation Flow

User data -> post data -> comment data -> performance data -> analytics engine -> recommendation engine -> strategy recommendation -> comment generation

The present demo uses feature seed records for posts/comments and the same typed contracts for analytics/recommendations. Its small sample insights are hypotheses, not statistically validated learning. Persisted feedback and an evaluation pipeline are still required before adaptive optimization is production-ready.
