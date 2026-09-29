import type { OpportunityFeedState } from '../types/opportunity';

export const initialOpportunityFeedState: OpportunityFeedState = {
  query: '',
  topic: 'All topics',
  sort: 'highest-score',
  view: 'All',
  savedIds: [],
  dismissedIds: [],
};