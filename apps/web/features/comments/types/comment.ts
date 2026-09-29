import type { CommentQualityScore, CommentType as SharedCommentType, StrategyType } from '@repo/types';
import type { PostRecord } from '../../posts/types/post';

export type CommentType = SharedCommentType;
export type CommentStrategy = StrategyType;
export type CommentCategory = 'All' | 'High performing' | 'Needs improvement' | 'Questions' | 'Insights' | 'Experience' | 'Educational' | 'Contrarian' | 'Supporting' | 'Generic';

export type CommentRecord = {
  id: string;
  postId: string;
  content: string;
  type: CommentType;
  strategy: CommentStrategy;
  quality: CommentQualityScore;
  reactions: number;
  replies: number;
  profileVisits: number;
  ageDays: number;
  performance: 'Above average' | 'On track' | 'Needs a lift';
  reasoning: string;
  improvement: string;
  alternative: string;
};

export type CommentWithPost = CommentRecord & { post: PostRecord };

export type CommentFilters = {
  query: string;
  category: CommentCategory;
};