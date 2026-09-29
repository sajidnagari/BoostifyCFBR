import { getAnalyticsData } from '../../analytics/services/analytics.service';
import { getComments } from '../../comments/services/comments.service';
import { getOpportunities } from '../../opportunities/services/opportunity.service';
import { getPosts } from '../../posts/services/posts.service';
import type { DashboardSnapshot, DashboardSummary } from '../types';

export function getDashboardSummary(): DashboardSummary {
  const analytics = getAnalyticsData('30D');
  return {
    totalComments: analytics.commentsAnalyzed,
    commentsAnalyzed: analytics.commentsAnalyzed,
    avgEngagement: analytics.averageEngagement,
    profileVisits: analytics.profileVisits,
  };
}

export function getDashboardSnapshot(): DashboardSnapshot {
  const analytics = getAnalyticsData('30D');
  const comments = getComments();
  const posts = getPosts();
  const opportunities = getOpportunities().sort((first, second) => second.score - first.score);
  const experienceComments = comments.filter((comment) => comment.type === 'experience');
  const otherComments = comments.filter((comment) => comment.type !== 'experience');
  const averageReplies = (items: typeof comments) => items.length ? items.reduce((sum, comment) => sum + comment.replies, 0) / items.length : 0;
  const experienceReplies = averageReplies(experienceComments).toFixed(1);
  const otherReplies = averageReplies(otherComments).toFixed(1);
  const strategySuccess = Math.round(comments.filter((comment) => comment.quality.overall >= 80).length / Math.max(comments.length, 1) * 100);

  return {
    summary: getDashboardSummary(),
    metrics: [
      { id: 'comments', label: 'Comments analyzed', value: `${analytics.commentsAnalyzed}`, detail: 'Across linked post sample', change: `${comments.filter((comment) => comment.performance === 'Above average').length} above sample average` },
      { id: 'engagement', label: 'Average engagement', value: `${analytics.averageEngagement}%`, detail: `Across ${posts.length} analyzed posts`, change: 'Post engagement rate' },
      { id: 'replies', label: 'Replies received', value: `${analytics.replies}`, detail: 'On analyzed comments', change: `${analytics.commentsAnalyzed ? (analytics.replies / analytics.commentsAnalyzed).toFixed(1) : '0'} replies per comment` },
      { id: 'visits', label: 'Profile visits', value: `${analytics.profileVisits}`, detail: 'Attributed in sample', change: 'From tracked comment outcomes' },
      { id: 'opportunities', label: 'High-fit opportunities', value: `${opportunities.filter((item) => item.score >= 80).length}`, detail: `Of ${opportunities.length} ranked posts`, change: `${opportunities.filter((item) => item.ageHours <= 6).length} discovered in 6h` },
      { id: 'strategy', label: 'Quality score 80+', value: `${strategySuccess}%`, detail: 'Of analyzed comments', change: `${comments.length} comments in demo sample` },
    ],
    analytics,
    opportunities: opportunities.slice(0, 3),
    recentComments: [...comments].sort((first, second) => first.ageDays - second.ageDays).slice(0, 4),
    insight: {
      title: 'Experience-led comments are starting stronger conversations',
      description: `In this demo sample, experience-led comments averaged ${experienceReplies} replies versus ${otherReplies} for other styles.`,
      evidence: 'Small sample · Based on comment records shown below',
    },
    demoNote: 'Demo data · These values are calculated from local sample posts and comments, not live accounts.',
  };
}
