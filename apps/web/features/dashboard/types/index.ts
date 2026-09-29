import type { AnalyticsData } from '../../analytics/types/analytics';
import type { CommentWithPost } from '../../comments/types/comment';
import type { Opportunity } from '../../opportunities/types/opportunity';

export type DashboardSummary = {
  totalComments: number;
  commentsAnalyzed: number;
  avgEngagement: number;
  profileVisits: number;
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  change: string;
};

export type DashboardSnapshot = {
  summary: DashboardSummary;
  metrics: DashboardMetric[];
  analytics: AnalyticsData;
  opportunities: Opportunity[];
  recentComments: CommentWithPost[];
  insight: { title: string; description: string; evidence: string };
  demoNote: string;
};
