import type { AIProvider, AnalyzeCommentInput, AnalyzePostInput } from './types';

export async function analyzePost(_input: AnalyzePostInput, _provider: AIProvider = 'openai') {
  return {
    opportunityScore: 92,
    summary: 'High-engagement post with strong conversation potential.',
    recommendedStrategy: 'Share a technical insight',
  };
}

export async function analyzeComment(_input: AnalyzeCommentInput, _provider: AIProvider = 'openai') {
  return {
    type: 'insight',
    qualityScore: 89,
    sentiment: 'positive',
    reasoning: 'The comment adds context and invites follow-up discussion.',
  };
}

export async function generateComment(_input: import('./types').GenerateCommentInput, provider: AIProvider = 'demo') {
  if (provider !== 'demo') {
    throw new Error(`The ${provider} provider is not configured. Select demo mode or configure a server-side provider.`);
  }

  const { post, topic, expertise, role, tone, writingStyle, length, strategy, additionalContext, variation = 0 } = _input;
  const topicPhrase = topic.toLowerCase();
  const expertisePhrase = expertise.trim() || 'product strategy';
  const contextSentence = additionalContext?.trim() ? ` ${additionalContext.trim()}` : '';
  const firstIdea = post.split(/[.!?]/).map((sentence) => sentence.trim()).find((sentence) => sentence.length > 24) ?? post.trim();
  const clippedIdea = firstIdea.length > 110 ? `${firstIdea.slice(0, 107).trimEnd()}...` : firstIdea;
  const lengthLead = length === 'short' ? '' : `${clippedIdea} `;
  const voiceLead = tone === 'conversational' ? 'One thing I would add: ' : tone === 'direct' ? 'A useful distinction: ' : 'A useful consideration: ';
  const roleContext = role.trim() ? `From a ${role.trim()} perspective, ` : '';
  const strategyAngle: Record<typeof strategy, string> = {
    add_unique_insight: 'the useful distinction is what changes for the person doing the work',
    ask_thoughtful_question: 'one thing worth testing is how the result changes in day-to-day use',
    share_experience: 'the practical lesson is to look at the full workflow, not one isolated step',
    explain_something: 'a useful way to evaluate this is to separate task success from recovery quality',
    challenge_assumption: 'the assumption I would test is whether the local improvement holds across the whole journey',
    give_an_example: 'a concrete example can show whether the change is useful beyond the initial demo',
    continue_discussion: 'the next question is which signal would show that the improvement lasts',
  };
  const insightText = variation % 2 === 0
    ? `${voiceLead}${lengthLead}${roleContext}${strategyAngle[strategy]}.${contextSentence}`
    : `${voiceLead}${lengthLead}${roleContext}I would compare the outcome with the effort required to get there; that is where the real value for ${expertisePhrase} becomes visible.${contextSentence}`;

  const templates: Array<Omit<import('./types').GeneratedComment, 'id' | 'strategy'>> = [
    {
      label: 'Expert insight',
      content: insightText,
      rationale: 'Adds a practical lens tied to your expertise and the post’s main idea.',
    },
    {
      label: 'Experience-led angle',
      content: `In ${topicPhrase}, I would look at what changes for the person doing the work, not only the system around them. That usually shows whether the improvement holds up in practice.${contextSentence}`,
      rationale: `Uses your ${writingStyle.toLowerCase()} voice without inventing a personal result or credential.`,
    },
    {
      label: 'Conversation starter',
      content: `How are you measuring the downstream effect on ${expertisePhrase}? I am curious whether the team sees a difference once this reaches day-to-day use.${contextSentence}`,
      rationale: 'Opens a specific follow-up that invites a useful reply instead of generic agreement.',
    },
  ];

  return templates.map((template, index) => ({
    ...template,
    id: `demo-${index + 1}`,
    strategy,
  }));
}

export async function generateStrategy(_input: string, _provider: AIProvider = 'openai') {
  return {
    recommendations: [
      { strategy: 'Add technical insight', confidence: 94 },
      { strategy: 'Share personal experience', confidence: 87 },
      { strategy: 'Ask a thoughtful question', confidence: 81 },
    ],
    provider: _provider,
  };
}
