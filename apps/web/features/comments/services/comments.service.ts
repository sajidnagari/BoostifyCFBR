import type { CommentFilters, CommentRecord, CommentWithPost } from '../types/comment';
import { getPostById } from '../../posts/services/posts.service';

const DEMO_COMMENTS: CommentRecord[] = [
  {
    id: 'comment-handoffs', postId: 'ai-coordination', type: 'experience', strategy: 'share_experience',
    content: 'We saw the same pattern in our support workflow. The biggest change was not faster drafting; it was giving the next person the full context without another handoff. That cut our resolution loop by a day.',
    quality: { relevance: 94, value: 91, originality: 86, conversation: 88, clarity: 90, expertise: 92, overall: 90 },
    reactions: 42, replies: 8, profileVisits: 17, ageDays: 2, performance: 'Above average',
    reasoning: 'The comment connects the author’s claim to a specific outcome and gives readers a concrete example to respond to.',
    improvement: 'Add a brief qualifier about team size or workflow complexity so readers can judge how transferable the result is.',
    alternative: 'In our support workflow, the gain came from carrying context across the handoff, not drafting faster. Resolution time dropped by a day. I wonder if the same distinction shows up in product teams?',
  },
  {
    id: 'comment-retention-question', postId: 'creator-retention', type: 'question', strategy: 'ask_thoughtful_question',
    content: 'How are you separating repeat viewers who return for a specific topic from people who are building a broader relationship with the creator?',
    quality: { relevance: 89, value: 82, originality: 78, conversation: 92, clarity: 94, expertise: 81, overall: 86 },
    reactions: 28, replies: 6, profileVisits: 11, ageDays: 3, performance: 'Above average',
    reasoning: 'A focused question extends the post’s central idea and invites the author to share their measurement method.',
    improvement: 'Offer a small observation before the question to make your own perspective more visible.',
    alternative: 'We have found that repeat viewing on one topic can mean something different from returning across topics. How are you distinguishing topic loyalty from a broader creator relationship?',
  },
  {
    id: 'comment-onboarding-insight', postId: 'activation-friction', type: 'insight', strategy: 'add_unique_insight',
    content: 'The first project choice sounds like a confidence problem more than a navigation problem. A useful template could remove both the blank canvas and the fear of choosing incorrectly.',
    quality: { relevance: 91, value: 89, originality: 87, conversation: 79, clarity: 93, expertise: 88, overall: 88 },
    reactions: 21, replies: 3, profileVisits: 8, ageDays: 5, performance: 'On track',
    reasoning: 'It reframes the activation barrier in a way that suggests a practical product intervention.',
    improvement: 'Make the claim more precise by connecting confidence to a behavior observed in onboarding sessions.',
    alternative: 'That first-project drop-off may be a confidence issue disguised as navigation friction. In testing, a starter template often helps because it gives people a low-risk first move.',
  },
  {
    id: 'comment-research-example', postId: 'research-interviews', type: 'experience', strategy: 'give_an_example',
    content: 'One of our most useful research notes came from the final “anything we missed?” question. The customer described a workaround we had not considered part of the product journey.',
    quality: { relevance: 84, value: 78, originality: 74, conversation: 70, clarity: 88, expertise: 80, overall: 79 },
    reactions: 11, replies: 1, profileVisits: 3, ageDays: 8, performance: 'Needs a lift',
    reasoning: 'The example is relevant but lacks enough detail to make the workaround memorable or useful to other readers.',
    improvement: 'Name the job the workaround solved and the insight it changed, while protecting customer details.',
    alternative: 'That final question surfaced a workaround that changed how we mapped onboarding: people were exporting data just to compare two setup paths. The interview guide never asked about that step.',
  },
  {
    id: 'comment-evaluation-framework', postId: 'ai-evaluation', type: 'educational', strategy: 'explain_something',
    content: 'We add recovery quality to our launch review: can someone notice an incorrect output, correct it quickly, and understand what changed? A strong task benchmark can still hide a rough recovery path.',
    quality: { relevance: 90, value: 94, originality: 85, conversation: 86, clarity: 90, expertise: 93, overall: 90 },
    reactions: 32, replies: 7, profileVisits: 14, ageDays: 1, performance: 'Above average',
    reasoning: 'A reusable evaluation lens extends the original point with clear, actionable criteria.',
    improvement: 'Add one example of a recovery metric to make the framework easier for teams to apply.',
    alternative: 'We review recovery quality alongside task success: how quickly can users spot an error, correct it, and understand the change? That often reveals issues a benchmark misses.',
  },
  {
    id: 'comment-roadmap-generic', postId: 'community-feedback', type: 'generic', strategy: 'continue_discussion',
    content: 'Great point. Listening to customers is so important for building better products.',
    quality: { relevance: 62, value: 35, originality: 22, conversation: 28, clarity: 88, expertise: 31, overall: 43 },
    reactions: 2, replies: 0, profileVisits: 0, ageDays: 9, performance: 'Needs a lift',
    reasoning: 'The response agrees but adds no specific insight, evidence, or next step for the conversation.',
    improvement: 'Replace generic agreement with a concrete example of how a request revealed an underlying job.',
    alternative: 'We once treated “add a dashboard” as a feature request, then learned the real job was catching a missed handoff. Asking about the moment before the request changed the solution.',
  },
  {
    id: 'comment-opportunity-tradeoff', postId: 'community-feedback', type: 'contrarian', strategy: 'challenge_assumption',
    content: 'I agree requests are symptoms, though I would keep a visible count too. A repeated workaround can reveal urgency even when the proposed feature is not the right solution.',
    quality: { relevance: 86, value: 83, originality: 79, conversation: 90, clarity: 89, expertise: 85, overall: 85 },
    reactions: 19, replies: 5, profileVisits: 9, ageDays: 4, performance: 'On track',
    reasoning: 'The respectful qualification adds nuance and preserves the original idea while exploring an adjacent signal.',
    improvement: 'Support the urgency point with an example of how repeated workarounds changed prioritization.',
    alternative: 'Requests are symptoms, but repeated workarounds still tell us about urgency. We track both the underlying job and how often people have built a workaround around it.',
  },
];

function withPost(comment: CommentRecord): CommentWithPost | undefined {
  const post = getPostById(comment.postId);
  return post ? { ...comment, post } : undefined;
}

export function getComments(filters?: Partial<CommentFilters>): CommentWithPost[] {
  const query = filters?.query?.trim().toLowerCase() ?? '';
  const category = filters?.category ?? 'All';
  const categoryType: Partial<Record<Exclude<CommentFilters['category'], 'All' | 'High performing' | 'Needs improvement'>, CommentRecord['type']>> = {
    Questions: 'question',
    Insights: 'insight',
    Experience: 'experience',
    Educational: 'educational',
    Contrarian: 'contrarian',
    Supporting: 'supporting',
    Generic: 'generic',
  };

  return DEMO_COMMENTS
    .map(withPost)
    .filter((comment): comment is CommentWithPost => Boolean(comment))
    .filter((comment) => {
      if (category === 'High performing') return comment.quality.overall >= 85;
      if (category === 'Needs improvement') return comment.quality.overall < 70;
      if (category !== 'All') return comment.type === categoryType[category];
      return true;
    })
    .filter((comment) => `${comment.content} ${comment.post.title} ${comment.post.author.name} ${comment.type}`.toLowerCase().includes(query))
    .sort((first, second) => second.ageDays - first.ageDays);
}

export function getCommentById(id: string): CommentWithPost | undefined {
  const comment = DEMO_COMMENTS.find((item) => item.id === id);
  return comment ? withPost(comment) : undefined;
}