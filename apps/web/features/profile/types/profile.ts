export type ExpertiseProfile = {
  name: string;
  role: string;
  industry: string;
  experience: string;
  skills: string[];
  topics: string[];
  interests: string[];
  tone: string;
  writingStyle: string;
  preferredLength: 'Short' | 'Balanced' | 'Detailed';
};