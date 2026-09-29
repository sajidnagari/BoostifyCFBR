import { opportunitiesConstants } from '../constants';
import type { Opportunity, OpportunityCandidate } from '../types/opportunity';
import { calculateOpportunityScore } from './opportunity-score.service';
import { getPosts } from '../../posts/services/posts.service';

export function getOpportunities(): Opportunity[] {
  const candidates: OpportunityCandidate[] = getPosts().map((post) => ({
    id: post.id,
    title: post.title,
    author: post.author.name,
    authorInitials: post.author.initials,
    source: post.platform,
    topic: post.topic,
    excerpt: post.body,
    strategy: post.suggestedStrategy,
    rationale: post.analysisSummary,
    ageHours: post.ageHours,
    comments: post.comments,
    reactions: post.reactions,
    engagementRate: post.engagementRate,
    signals: post.opportunitySignals,
  }));

  return candidates
    .map((candidate) => ({ ...candidate, score: calculateOpportunityScore(candidate.signals) }))
    .filter((opportunity) => opportunity.score >= opportunitiesConstants.minimumScore);
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return getOpportunities().find((opportunity) => opportunity.id === id);
}