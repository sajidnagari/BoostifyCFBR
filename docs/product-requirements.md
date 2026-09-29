# Product Requirements

## Product Overview

Comment Growth AI is an AI-powered platform designed to help users improve engagement through smarter commenting strategy. The product supports post and comment analysis, opportunity scoring, AI-generated recommendations, and performance analytics over time.

## Core Goals

- Identify high-value commenting opportunities
- Explain why a comment performs well or poorly
- Recommend the right strategy and comment style for each post
- Personalize AI suggestions using user expertise and tone preferences
- Learn from historical engagement data to improve future recommendations

## MVP Scope

The initial release focuses on:

- dashboard metrics and AI recommendations
- post analysis and opportunity scoring
- comment analysis and quality scoring
- strategy recommendations and AI comment generation
- analytics over time
- profile and account settings

## Demo Foundation Status

The web app currently demonstrates the MVP workflow with feature-owned, typed local records. The implemented routes cover dashboard, opportunities and opportunity detail, post library and post detail, comment intelligence and comment detail, comment generation, analytics, strategies, profile settings, and connected-account settings.

Demo-only behavior is labeled in the UI. Profile values persist in browser local storage; account connect/disconnect/sync actions only update local state; generated options come from the isolated `demo` AI provider; no social account access, publishing, live ingestion, or persistent API-backed analytics is performed. The API and database are scaffolds, not a live production integration.

Trend charts use deterministic illustrative series by selected period. Strategy, topic, comment quality, and comment-length breakdowns derive from the local seed records. Recommendations are hypotheses from a small sample and are not presented as statistically validated outcomes.

## Non-goals for MVP

- full social media scheduler
- multi-platform publishing automation
- marketing CRM or enterprise billing
- influencer marketplace features
- complex team permissions

## Success Criteria

The project should prove that better commenting strategy can improve measurable engagement outcomes.
