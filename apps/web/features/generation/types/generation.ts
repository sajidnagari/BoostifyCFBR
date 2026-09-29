import type { GeneratedComment, GenerateCommentInput } from '@repo/ai';

export type GenerationForm = GenerateCommentInput;
export type GenerationOption = GeneratedComment;
export type RefinementMode = 'improve' | 'shorten' | 'natural' | 'technical' | 'conversational';