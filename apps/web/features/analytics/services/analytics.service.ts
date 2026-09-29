import { getComments } from '../../comments/services/comments.service';
import type { CommentWithPost } from '../../comments/types/comment';
import { getPosts } from '../../posts/services/posts.service';
import type { AnalyticsData, AnalyticsRange, PerformanceGroup, TrendPoint } from '../types/analytics';

const TREND_BY_RANGE: Record<AnalyticsRange, TrendPoint[]> = {
  '7D': [
    { label: 'Mon', engagement: 5.8, comments: 2, replies: 5, visits: 8 },
    { label: 'Tue', engagement: 6.2, comments: 1, replies: 3, visits: 6 },
    { label: 'Wed', engagement: 7.1, comments: 3, replies: 7, visits: 12 },
    { label: 'Thu', engagement: 6.7, comments: 2, replies: 4, visits: 9 },
    { label: 'Fri', engagement: 7.8, comments: 4, replies: 8, visits: 14 },
    { label: 'Sat', engagement: 7.4, comments: 2, replies: 5, visits: 7 },
    { label: 'Sun', engagement: 8.1, comments: 3, replies: 9, visits: 16 },
  ],
  '30D': [
    { label: 'Sep 1', engagement: 5.2, comments: 8, replies: 14, visits: 31 },
    { label: 'Sep 6', engagement: 5.8, comments: 11, replies: 20, visits: 38 },
    { label: 'Sep 11', engagement: 6.1, comments: 9, replies: 18, visits: 35 },
    { label: 'Sep 16', engagement: 6.9, comments: 14, replies: 27, visits: 47 },
    { label: 'Sep 21', engagement: 7.3, comments: 17, replies: 32, visits: 54 },
    { label: 'Sep 26', engagement: 7.8, comments: 19, replies: 41, visits: 62 },
  ],
  '90D': [
    { label: 'Jul 1', engagement: 4.1, comments: 18, replies: 29, visits: 72 },
    { label: 'Jul 15', engagement: 4.5, comments: 22, replies: 36, visits: 88 },
    { label: 'Jul 29', engagement: 5.0, comments: 26, replies: 42, visits: 103 },
    { label: 'Aug 12', engagement: 5.4, comments: 31, replies: 54, visits: 121 },
    { label: 'Aug 26', engagement: 6.3, comments: 38, replies: 69, visits: 147 },
    { label: 'Sep 9', engagement: 6.8, comments: 42, replies: 77, visits: 166 },
    { label: 'Sep 23', engagement: 7.8, comments: 50, replies: 103, visits: 194 },
  ],
  ALL: [
    { label: 'Apr', engagement: 3.2, comments: 24, replies: 31, visits: 81 },
    { label: 'May', engagement: 3.8, comments: 31, replies: 45, visits: 102 },
    { label: 'Jun', engagement: 4.1, comments: 38, replies: 53, visits: 124 },
    { label: 'Jul', engagement: 4.8, comments: 48, replies: 71, visits: 163 },
    { label: 'Aug', engagement: 6.0, comments: 69, replies: 113, visits: 231 },
    { label: 'Sep', engagement: 7.8, comments: 91, replies: 194, visits: 348 },
  ],
};

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function groupPerformance(labels: Map<string, CommentWithPost[]>) {
  return Array.from(labels.entries()).map(([label, records]) => {
    return {
      label,
      count: records.length,
      averageQuality: Math.round(average(records.map((comment) => comment.quality.overall))),
      averageReplies: Number(average(records.map((comment) => comment.replies)).toFixed(1)),
    } satisfies PerformanceGroup;
  }).sort((first, second) => second.averageQuality - first.averageQuality);
}

export function getAnalyticsData(range: AnalyticsRange = '30D'): AnalyticsData {
  const posts = getPosts();
  const comments = getComments();
  const byStrategy = new Map<string, ReturnType<typeof getComments>>();
  const strategyLabels: Record<string, string> = {
    add_unique_insight: 'Personal insight',
    ask_thoughtful_question: 'Thoughtful question',
    share_experience: 'Experience',
    explain_something: 'Educational',
    challenge_assumption: 'Contrarian',
    give_an_example: 'Example',
    continue_discussion: 'Supporting',
  };
  comments.forEach((comment) => {
    const label = strategyLabels[comment.strategy] ?? comment.strategy;
    byStrategy.set(label, [...(byStrategy.get(label) ?? []), comment]);
  });

  const byTopic = new Map<string, typeof posts>();
  posts.forEach((post) => byTopic.set(post.topic, [...(byTopic.get(post.topic) ?? []), post]));
  const topicPerformance = Array.from(byTopic.entries()).map(([topic, topicPosts]) => ({
    topic,
    posts: topicPosts.length,
    engagement: Number(average(topicPosts.map((post) => post.engagementRate)).toFixed(1)),
  })).sort((first, second) => second.engagement - first.engagement);

  const lengthBuckets = new Map<string, ReturnType<typeof getComments>>([
    ['Short · under 20 words', []],
    ['Balanced · 20–45 words', []],
    ['Detailed · over 45 words', []],
  ]);
  comments.forEach((comment) => {
    const wordCount = comment.content.split(/\s+/).length;
    const label = wordCount < 20 ? 'Short · under 20 words' : wordCount <= 45 ? 'Balanced · 20–45 words' : 'Detailed · over 45 words';
    lengthBuckets.set(label, [...(lengthBuckets.get(label) ?? []), comment]);
  });

  const lengthPerformance = Array.from(lengthBuckets.entries()).map(([label, records]) => ({
    label,
    comments: records.length,
    quality: Math.round(average(records.map((comment) => comment.quality.overall))),
  }));

  return {
    range,
    trend: TREND_BY_RANGE[range],
    commentsAnalyzed: comments.length,
    averageEngagement: Number(average(posts.map((post) => post.engagementRate)).toFixed(1)),
    replies: comments.reduce((total, comment) => total + comment.replies, 0),
    profileVisits: comments.reduce((total, comment) => total + comment.profileVisits, 0),
    strategyPerformance: groupPerformance(byStrategy),
    topicPerformance,
    lengthPerformance,
    averageCommentLength: Math.round(average(comments.map((comment) => comment.content.split(/\s+/).length))),
  };
}