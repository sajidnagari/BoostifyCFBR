# Database Model Overview

## Core Models

- User
- Profile
- SocialAccount
- Post
- Comment
- CommentAnalysis
- CommentPerformance
- Opportunity
- Recommendation
- AIInteraction
- Strategy

## Relationship Goals

- A user owns one profile and many social accounts
- A user has many posts, comments, opportunities, recommendations, and strategies
- A post owns many comments
- A comment can have one analysis record and many performance snapshots

## Implementation Notes

Database structure must preserve raw content separately from AI-generated analysis and historical performance tracking.

The current Prisma schema is a foundation only. The interactive web demo reads typed local feature records and browser-local profile preferences; it does not use Prisma or the Express API for persistence. Before production, add migrations and ownership/tenant constraints for accounts, posts, opportunities, recommendations, strategy outcomes, and AI interaction audit records. Social access tokens must remain encrypted and server-side; the demo account screen stores no tokens.
