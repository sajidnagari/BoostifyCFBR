import { generateComment } from '@repo/ai';
import type { GenerateCommentInput } from '@repo/ai';
import type { RefinementMode } from '../types/generation';

export async function generateCommentOptions(input: GenerateCommentInput, variation: number) {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 420));
  return generateComment({ ...input, variation }, 'demo');
}

export function refineComment(content: string, mode: RefinementMode): string {
  const normalized = content.trim();
  if (mode === 'shorten') {
    const words = normalized.split(/\s+/);
    return words.length > 24 ? `${words.slice(0, 24).join(' ').replace(/[.,;:]?$/, '')}.` : normalized;
  }
  if (mode === 'natural') {
    return normalized.replace(/^A useful consideration:/, 'One thing I would consider is').replace(/^A useful distinction:/, 'The distinction I would look at is');
  }
  if (mode === 'conversational') {
    return normalized.replace(/^A useful consideration:/, 'I have been thinking about this:').replace(/^A useful distinction:/, 'One thing that stands out to me is');
  }
  if (mode === 'technical') {
    return `${normalized.replace(/[.\s]+$/, '')}. I would compare time-to-value with correction rate to see whether the improvement holds in practice.`;
  }
  return normalized.replace(/[.\s]+$/, '') + '. A useful next step is to test this against the user outcome, not just the feature-level activity.';
}