import type { ExpertiseProfile } from './types/profile';

export const demoExpertiseProfile: ExpertiseProfile = {
  name: 'Morgan Chen',
  role: 'Product strategist',
  industry: 'B2B software',
  experience: '10 years building product and growth systems for SaaS teams.',
  skills: ['Product strategy', 'AI product design', 'Growth experimentation'],
  topics: ['AI & automation', 'Creator growth', 'Product strategy', 'Audience research'],
  interests: ['Behavior change', 'Customer research', 'Product-led growth'],
  tone: 'Thoughtful and direct',
  writingStyle: 'Clear, example-led, concise',
  preferredLength: 'Balanced',
};

export const profileStorageKey = 'comment-growth-ai:demo-profile';
export const profileUpdatedEvent = 'comment-growth-ai:profile-updated';