import { analyzeComment, analyzePost, generateComment, generateStrategy } from './services';

export type { AIProvider, AnalyzeCommentInput, AnalyzePostInput, GeneratedComment, GenerateCommentInput } from './types';
export { analyzeComment, analyzePost, generateComment, generateStrategy } from './services';

export const ai = {
  analyzeComment,
  analyzePost,
  generateComment,
  generateStrategy,
};
