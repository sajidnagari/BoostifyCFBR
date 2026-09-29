export type StrategyRecord = {
  id: string;
  label: string;
  description: string;
  when: string;
  example: string;
  comments: number;
  averageQuality: number;
  averageReplies: number;
  totalReplies: number;
  sampleStatus: 'Observed' | 'No sample yet';
};