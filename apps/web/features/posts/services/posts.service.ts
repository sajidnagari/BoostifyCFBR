import type { PostFilters, PostRecord } from '../types/post';

const DEMO_POSTS: PostRecord[] = [
  {
    id: 'ai-coordination',
    title: 'The best AI products reduce coordination, not just clicks',
    body: 'Teams do not need another assistant in every tool. The bigger unlock is removing the handoffs between tools and people. We are starting to see the strongest products coordinate work across the gaps, not just automate individual tasks.',
    topic: 'AI & automation',
    platform: 'LinkedIn',
    author: { name: 'Mira Chen', handle: '@mirachen', role: 'VP Product, Relay', initials: 'MC' },
    ageHours: 1,
    reactions: 214,
    comments: 38,
    reposts: 17,
    views: 8420,
    engagementRate: 8.9,
    opportunityScore: 89,
    opportunitySignals: { engagement: 84, audienceRelevance: 92, discussionActivity: 87, topicRelevance: 94, authorInfluence: 76, recency: 98, commentVisibility: 82 },
    analysisStatus: 'Analyzed',
    suggestedStrategy: 'Add a practical workflow example',
    analysisSummary: 'High relevance and active discussion create a strong opening for a concrete implementation perspective.',
    audienceContext: 'Product leaders and operators are debating where AI meaningfully changes team workflows.',
    conversationAngle: 'Describe a handoff you removed and the measurable effect on time-to-value.',
  },
  {
    id: 'creator-retention',
    title: 'Retention is a better creator growth metric than reach',
    body: 'A smaller audience that comes back every week can outperform a viral spike. We are tracking return viewers as a leading signal because repeat attention is what turns a post into a relationship.',
    topic: 'Creator growth',
    platform: 'LinkedIn',
    author: { name: 'Jordan Alvarez', handle: '@jordanalvarez', role: 'Creator Partnerships, Northstar', initials: 'JA' },
    ageHours: 3,
    reactions: 173,
    comments: 26,
    reposts: 11,
    views: 6650,
    engagementRate: 7.4,
    opportunityScore: 84,
    opportunitySignals: { engagement: 79, audienceRelevance: 90, discussionActivity: 82, topicRelevance: 88, authorInfluence: 72, recency: 92, commentVisibility: 77 },
    analysisStatus: 'Analyzed',
    suggestedStrategy: 'Share a useful measurement tip',
    analysisSummary: 'Strong early discussion and close alignment with your audience interests.',
    audienceContext: 'Creators and growth teams are comparing durable audience signals with short-lived reach.',
    conversationAngle: 'Offer one leading indicator that predicts repeat engagement in your own work.',
  },
  {
    id: 'activation-friction',
    title: 'Where does onboarding friction actually begin?',
    body: 'We mapped every step from signup to first value. The surprising drop-off was not the form; it was choosing a first project. Removing that blank-canvas moment moved activation more than shortening the signup flow.',
    topic: 'Product strategy',
    platform: 'LinkedIn',
    author: { name: 'Nia Patel', handle: '@niapatel', role: 'Growth Lead, Common Room', initials: 'NP' },
    ageHours: 5,
    reactions: 121,
    comments: 19,
    reposts: 8,
    views: 4920,
    engagementRate: 6.1,
    opportunityScore: 80,
    opportunitySignals: { engagement: 73, audienceRelevance: 86, discussionActivity: 78, topicRelevance: 84, authorInfluence: 69, recency: 85, commentVisibility: 72 },
    analysisStatus: 'Analyzed',
    suggestedStrategy: 'Ask a focused follow-up question',
    analysisSummary: 'The author is actively responding, making this a good opening for a thoughtful question.',
    audienceContext: 'Product growth practitioners are discussing activation and first-value moments.',
    conversationAngle: 'Ask how the team distinguished setup friction from uncertainty about what to do first.',
  },
  {
    id: 'research-interviews',
    title: 'Customer interviews fail when the question is too polished',
    body: 'The best interviews often start when the script ends. We now reserve the final ten minutes for whatever the customer wants to unpack. That is where the language and workarounds we never thought to ask about tend to show up.',
    topic: 'Audience research',
    platform: 'LinkedIn',
    author: { name: 'Sam Okafor', handle: '@samokafor', role: 'Research Director, Fieldnotes', initials: 'SO' },
    ageHours: 8,
    reactions: 196,
    comments: 31,
    reposts: 13,
    views: 7310,
    engagementRate: 8.2,
    opportunityScore: 81,
    opportunitySignals: { engagement: 81, audienceRelevance: 78, discussionActivity: 91, topicRelevance: 82, authorInfluence: 74, recency: 78, commentVisibility: 85 },
    analysisStatus: 'Analyzed',
    suggestedStrategy: 'Offer a counterexample from practice',
    analysisSummary: 'A specific point is prompting healthy debate; a nuanced example would add value.',
    audienceContext: 'Researchers and product teams are exchanging methods for getting beyond scripted answers.',
    conversationAngle: 'Share a moment when an unplanned follow-up changed the problem definition.',
  },
  {
    id: 'ai-evaluation',
    title: 'What should teams evaluate before shipping an AI feature?',
    body: 'Benchmarks tell us whether a model can do the task. They say less about whether the feature belongs in the workflow at all. We are adding time-to-correction and successful handoff to our launch criteria.',
    topic: 'AI & automation',
    platform: 'LinkedIn',
    author: { name: 'Ravi Desai', handle: '@ravidesai', role: 'AI Product, Loomline', initials: 'RD' },
    ageHours: 13,
    reactions: 98,
    comments: 14,
    reposts: 6,
    views: 3820,
    engagementRate: 5.7,
    opportunityScore: 77,
    opportunitySignals: { engagement: 67, audienceRelevance: 89, discussionActivity: 69, topicRelevance: 91, authorInfluence: 71, recency: 67, commentVisibility: 68 },
    analysisStatus: 'New',
    suggestedStrategy: 'Share an evaluation framework',
    analysisSummary: 'A high-relevance discussion with room to contribute a decision-making framework.',
    audienceContext: 'AI product builders are weighing model quality against workflow outcomes and trust.',
    conversationAngle: 'Add a metric that captures recovery and user confidence, not just task completion.',
  },
  {
    id: 'community-feedback',
    title: 'Community feedback is not a roadmap vote',
    body: 'The most requested feature is often a symptom. We ask what people are trying to accomplish before we count requests. The underlying job tends to point us toward a better solution than the loudest feature suggestion.',
    topic: 'Product strategy',
    platform: 'LinkedIn',
    author: { name: 'Elena Rossi', handle: '@elenarossi', role: 'Product Advisor, Common Thread', initials: 'ER' },
    ageHours: 21,
    reactions: 144,
    comments: 22,
    reposts: 9,
    views: 5760,
    engagementRate: 6.8,
    opportunityScore: 75,
    opportunitySignals: { engagement: 74, audienceRelevance: 81, discussionActivity: 76, topicRelevance: 80, authorInfluence: 73, recency: 55, commentVisibility: 74 },
    analysisStatus: 'New',
    suggestedStrategy: 'Build on the underlying user need',
    analysisSummary: 'The post has a clear point of view and active replies from people sharing their process.',
    audienceContext: 'Product leaders are discussing how to balance customer requests with strategic focus.',
    conversationAngle: 'Describe a feature request that concealed a more important unmet need.',
  },
];

export function getPosts(filters?: Partial<PostFilters>): PostRecord[] {
  const query = filters?.query?.trim().toLowerCase() ?? '';
  const topic = filters?.topic ?? 'All topics';
  const sort = filters?.sort ?? 'opportunity';

  return DEMO_POSTS
    .filter((post) => topic === 'All topics' || post.topic === topic)
    .filter((post) => `${post.title} ${post.body} ${post.author.name} ${post.topic}`.toLowerCase().includes(query))
    .sort((first, second) => {
      if (sort === 'recent') return first.ageHours - second.ageHours;
      if (sort === 'engagement') return second.engagementRate - first.engagementRate;
      return second.opportunityScore - first.opportunityScore;
    });
}

export function getPostById(id: string): PostRecord | undefined {
  return DEMO_POSTS.find((post) => post.id === id);
}

export function getDemoPostTopics(): string[] {
  return ['All topics', ...Array.from(new Set(DEMO_POSTS.map((post) => post.topic)))];
}