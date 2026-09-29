import type { StrategyType } from '@repo/types';

export const generationStrategies: Array<{ value: StrategyType; label: string; description: string }> = [
  { value: 'add_unique_insight', label: 'Add a unique insight', description: 'Contribute a useful distinction or lens.' },
  { value: 'ask_thoughtful_question', label: 'Ask a thoughtful question', description: 'Open a focused next step in the discussion.' },
  { value: 'share_experience', label: 'Share experience', description: 'Bring a relevant lesson without overstating results.' },
  { value: 'explain_something', label: 'Explain something', description: 'Make a useful concept easier to apply.' },
  { value: 'challenge_assumption', label: 'Challenge an assumption', description: 'Offer respectful, evidence-aware nuance.' },
  { value: 'give_an_example', label: 'Give an example', description: 'Make the idea tangible with a concrete case.' },
  { value: 'continue_discussion', label: 'Continue the discussion', description: 'Connect the idea to its next implication.' },
];

export const generationLengths = ['short', 'balanced', 'detailed'] as const;