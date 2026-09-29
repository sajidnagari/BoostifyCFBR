import type { OpportunityScoreInput } from '@repo/types';

export type PostTopic = 'AI & automation' | 'Creator growth' | 'Product strategy' | 'Audience research';

export type PostAuthor = {
  name: string;
  handle: string;
  role: string;
  initials: string;
};

export type PostRecord = {
  id: string;
  title: string;
  body: string;
  topic: PostTopic;
  platform: 'LinkedIn';
  author: PostAuthor;
  ageHours: number;
  reactions: number;
  comments: number;
  reposts: number;
  views: number;
  engagementRate: number;
  opportunityScore: number;
  opportunitySignals: OpportunityScoreInput;
  analysisStatus: 'Analyzed' | 'New';
  suggestedStrategy: string;
  analysisSummary: string;
  audienceContext: string;
  conversationAngle: string;
};

export type PostSort = 'opportunity' | 'engagement' | 'recent';

export type PostFilters = {
  query: string;
  topic: 'All topics' | PostTopic;
  sort: PostSort;
};