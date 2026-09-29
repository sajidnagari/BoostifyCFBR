import type { StrategyType } from '@repo/types';

export type AIProvider = 'demo' | 'openai' | 'anthropic';

export type AnalyzePostInput = {
  title: string;
  content: string;
  audience?: string;
};

export type AnalyzeCommentInput = {
  comment: string;
  context?: string;
};

export type GenerateCommentInput = {
  post: string;
  topic: string;
  expertise: string;
  role: string;
  tone: string;
  writingStyle: string;
  length: 'short' | 'balanced' | 'detailed';
  strategy: StrategyType;
  variation?: number;
  additionalContext?: string;
};

export type GeneratedComment = {
  id: string;
  label: string;
  content: string;
  strategy: StrategyType;
  rationale: string;
};
