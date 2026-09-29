export type AnalyticsRange = '7D' | '30D' | '90D' | 'ALL';

export type TrendPoint = {
  label: string;
  engagement: number;
  comments: number;
  replies: number;
  visits: number;
};

export type PerformanceGroup = {
  label: string;
  count: number;
  averageQuality: number;
  averageReplies: number;
};

export type AnalyticsData = {
  range: AnalyticsRange;
  trend: TrendPoint[];
  commentsAnalyzed: number;
  averageEngagement: number;
  replies: number;
  profileVisits: number;
  strategyPerformance: PerformanceGroup[];
  topicPerformance: Array<{ topic: string; posts: number; engagement: number }>;
  lengthPerformance: Array<{ label: string; comments: number; quality: number }>;
  averageCommentLength: number;
};