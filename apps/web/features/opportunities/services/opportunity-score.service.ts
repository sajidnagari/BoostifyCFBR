import { opportunitiesConstants } from '../constants';
import type { OpportunityScoreInput } from '@repo/types';

export type { OpportunityScoreInput } from '@repo/types';

export function calculateOpportunityScore(input: OpportunityScoreInput) {
  const weights = opportunitiesConstants.scoreWeights;
  const weightedScore = Object.entries(weights).reduce((total, [signal, weight]) => {
    const value = input[signal as keyof OpportunityScoreInput];
    const normalizedValue = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
    return total + normalizedValue * weight;
  }, 0);

  return Math.round(weightedScore / 100);
}
