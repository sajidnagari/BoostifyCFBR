export type CommentType = 'insight' | 'question' | 'experience' | 'contrarian' | 'supporting' | 'educational' | 'story' | 'generic';

export type StrategyType =
  | 'add_unique_insight'
  | 'ask_thoughtful_question'
  | 'share_experience'
  | 'explain_something'
  | 'challenge_assumption'
  | 'give_an_example'
  | 'continue_discussion';

export type CommentQualityScore = {
  relevance: number;
  value: number;
  originality: number;
  conversation: number;
  clarity: number;
  expertise: number;
  overall: number;
};

export type OpportunityScoreInput = {
  engagement: number;
  audienceRelevance: number;
  discussionActivity: number;
  topicRelevance: number;
  authorInfluence: number;
  recency: number;
  commentVisibility: number;
};
