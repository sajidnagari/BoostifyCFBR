import { getComments } from '../../comments/services/comments.service';
import { strategyDefinitions } from '../constants';
import type { StrategyRecord } from '../types/strategy';

export function getStrategyRecords(): StrategyRecord[] {
  const comments = getComments();
  return strategyDefinitions.map((definition) => {
    const samples = comments.filter((comment) => comment.type === definition.type);
    const quality = samples.reduce((total, comment) => total + comment.quality.overall, 0);
    const replies = samples.reduce((total, comment) => total + comment.replies, 0);
    return {
      id: definition.id,
      label: definition.label,
      description: definition.description,
      when: definition.when,
      example: definition.example,
      comments: samples.length,
      averageQuality: samples.length ? Math.round(quality / samples.length) : 0,
      averageReplies: samples.length ? Number((replies / samples.length).toFixed(1)) : 0,
      totalReplies: replies,
      sampleStatus: samples.length ? 'Observed' : 'No sample yet',
    };
  });
}

export function getTopStrategyRecommendation() {
  const strategies = getStrategyRecords().filter((strategy) => strategy.comments > 0);
  const topByReplies = [...strategies].sort((first, second) => second.averageReplies - first.averageReplies)[0];
  const topByQuality = [...strategies].sort((first, second) => second.averageQuality - first.averageQuality)[0];
  return {
    replyStrategy: topByReplies,
    qualityStrategy: topByQuality,
    suggestion: topByReplies ? `Try more ${topByReplies.label.toLowerCase()} comments on posts where you can add direct experience. This is a small demo sample, so treat it as a hypothesis to test.` : 'Analyze a few comments to get a personalized strategy suggestion.',
  };
}