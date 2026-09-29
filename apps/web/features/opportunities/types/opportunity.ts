import type { OpportunityScoreInput } from '../services/opportunity-score.service';
import type { opportunitiesConstants } from '../constants';

export type OpportunityTopic = (typeof opportunitiesConstants.topics)[number];

export type OpportunityCandidate = {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  source: string;
  topic: OpportunityTopic;
  excerpt: string;
  strategy: string;
  rationale: string;
  ageHours: number;
  comments: number;
  reactions: number;
  engagementRate: number;
  signals: OpportunityScoreInput;
};

export type Opportunity = OpportunityCandidate & { score: number };

export type OpportunitySort = 'highest-score' | 'engagement' | 'newest';
export type OpportunityView = 'All' | 'High opportunity' | 'Recent';

export type OpportunityFeedState = {
  query: string;
  topic: 'All topics' | OpportunityTopic;
  sort: OpportunitySort;
  view: OpportunityView;
  savedIds: string[];
  dismissedIds: string[];
};