'use client';

import { useState } from 'react';
import { getDemoPostTopics, getPosts } from '../services/posts.service';
import { initialPostFilters } from '../store/posts.store';
import type { PostFilters } from '../types/post';

export function usePosts() {
  const [filters, setFilters] = useState<PostFilters>(initialPostFilters);
  const posts = getPosts(filters);

  return {
    posts,
    filters,
    topics: getDemoPostTopics(),
    setQuery: (query: string) => setFilters((current) => ({ ...current, query })),
    setTopic: (topic: PostFilters['topic']) => setFilters((current) => ({ ...current, topic })),
    setSort: (sort: PostFilters['sort']) => setFilters((current) => ({ ...current, sort })),
  };
}