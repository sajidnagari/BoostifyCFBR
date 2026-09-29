'use client';

import { useEffect, useState } from 'react';
import type { GenerateCommentInput } from '@repo/ai';
import { useProfile } from '../../profile/hooks/use-profile';
import { getCommentById } from '../../comments/services/comments.service';
import { getPostById } from '../../posts/services/posts.service';
import { generateCommentOptions, refineComment } from '../services/generation.service';
import { initialGenerationState } from '../store/generation.store';
import type { GenerationOption, RefinementMode } from '../types/generation';

function toLength(length: string): GenerateCommentInput['length'] {
  return length.toLowerCase() as GenerateCommentInput['length'];
}

export function useCommentGenerator(initialPostId?: string, initialCommentId?: string) {
  const { profile } = useProfile();
  const sourceComment = initialCommentId ? getCommentById(initialCommentId) : undefined;
  const post = (initialPostId ? getPostById(initialPostId) : undefined) ?? sourceComment?.post;
  const [form, setForm] = useState<GenerateCommentInput>(() => ({
    post: post?.body ?? '',
    topic: post?.topic ?? 'Product strategy',
    expertise: profile.skills.join(', '),
    role: profile.role,
    tone: profile.tone,
    writingStyle: profile.writingStyle,
    length: toLength(profile.preferredLength),
    strategy: sourceComment?.strategy ?? 'add_unique_insight',
    additionalContext: sourceComment ? `Improve on this existing comment without repeating it: ${sourceComment.content}` : '',
  }));
  const [options, setOptions] = useState<GenerationOption[]>([]);
  const [isGenerating, setIsGenerating] = useState(initialGenerationState.isGenerating);
  const [variation, setVariation] = useState(initialGenerationState.variation);
  const [selectedOptionId, setSelectedOptionId] = useState(initialGenerationState.selectedOptionId);
  const [refiningId, setRefiningId] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);

  useEffect(() => {
    if (profileEdited) return;
    setForm((current) => ({
      ...current,
      expertise: profile.skills.join(', '),
      role: profile.role,
      tone: profile.tone,
      writingStyle: profile.writingStyle,
      length: toLength(profile.preferredLength),
    }));
  }, [profile, profileEdited]);

  function updateForm(update: Partial<GenerateCommentInput>) {
    if (update.expertise || update.role || update.tone || update.writingStyle || update.length) setProfileEdited(true);
    setForm((current) => ({ ...current, ...update }));
  }

  async function generate() {
    if (!form.post.trim()) {
      setError('Add the post you want to respond to before generating options.');
      return;
    }
    setError('');
    setIsGenerating(true);
    const nextVariation = variation + 1;
    try {
      const generatedOptions = await generateCommentOptions(form, nextVariation);
      setOptions(generatedOptions);
      setSelectedOptionId(generatedOptions[0]?.id ?? '');
      setVariation(nextVariation);
    } catch {
      setError('The demo generator could not complete that request. Try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  async function refine(id: string, mode: RefinementMode) {
    const option = options.find((item) => item.id === id);
    if (!option) return;
    setSelectedOptionId(id);
    setRefiningId(id);
    await new Promise<void>((resolve) => window.setTimeout(resolve, 240));
    setOptions((current) => current.map((item) => item.id === id ? { ...item, content: refineComment(item.content, mode) } : item));
    setRefiningId('');
  }

  async function copy(id: string) {
    const option = options.find((item) => item.id === id);
    if (!option) return;
    await navigator.clipboard.writeText(option.content);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  }

  return {
    form,
    options,
    postTitle: post?.title,
    postTopic: post?.topic,
    sourceComment,
    isGenerating,
    variation,
    selectedOptionId,
    refiningId,
    error,
    isCopied,
    updateForm,
    generate,
    refine,
    copy,
    selectOption: setSelectedOptionId,
  };
}