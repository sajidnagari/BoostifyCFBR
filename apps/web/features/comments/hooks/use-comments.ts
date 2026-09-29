'use client';

import { useState } from 'react';
import { getComments } from '../services/comments.service';
import { initialCommentFilters } from '../store/comments.store';
import type { CommentCategory, CommentFilters } from '../types/comment';

export function useComments() {
  const [filters, setFilters] = useState<CommentFilters>(initialCommentFilters);
  return {
    comments: getComments(filters),
    filters,
    setQuery: (query: string) => setFilters((current) => ({ ...current, query })),
    setCategory: (category: CommentCategory) => setFilters((current) => ({ ...current, category })),
  };
}