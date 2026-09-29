'use client';

import { useState } from 'react';
import { opportunitiesConstants } from '../constants';
import { getOpportunities } from '../services/opportunity.service';
import { initialOpportunityFeedState } from '../store/opportunity-feed.store';
import type { Opportunity, OpportunityFeedState, OpportunitySort } from '../types/opportunity';

export function useOpportunities() {
  const [opportunities] = useState<Opportunity[]>(getOpportunities);
  const [feedState, setFeedState] = useState<OpportunityFeedState>(initialOpportunityFeedState);
  const visibleOpportunities = opportunities
    .filter((opportunity) => !feedState.dismissedIds.includes(opportunity.id))
    .filter((opportunity) => feedState.view !== 'High opportunity' || opportunity.score >= 85)
    .filter((opportunity) => feedState.view !== 'Recent' || opportunity.ageHours <= 6)
    .filter((opportunity) => feedState.topic === 'All topics' || opportunity.topic === feedState.topic)
    .filter((opportunity) => {
      const searchableText = `${opportunity.title} ${opportunity.author} ${opportunity.topic} ${opportunity.excerpt}`.toLowerCase();
      return searchableText.includes(feedState.query.trim().toLowerCase());
    })
    .sort((first, second) => {
      if (feedState.sort === 'newest') return first.ageHours - second.ageHours;
      if (feedState.sort === 'engagement') return second.engagementRate - first.engagementRate;
      return second.score - first.score;
    });

  function setQuery(query: string) {
    setFeedState((current) => ({ ...current, query }));
  }

  function setTopic(topic: OpportunityFeedState['topic']) {
    setFeedState((current) => ({ ...current, topic }));
  }

  function setSort(sort: OpportunitySort) {
    setFeedState((current) => ({ ...current, sort }));
  }

  function setView(view: OpportunityFeedState['view']) {
    setFeedState((current) => ({ ...current, view }));
  }

  function toggleSaved(id: string) {
    setFeedState((current) => ({
      ...current,
      savedIds: current.savedIds.includes(id)
        ? current.savedIds.filter((savedId) => savedId !== id)
        : [...current.savedIds, id],
    }));
  }

  function dismiss(id: string) {
    setFeedState((current) => ({
      ...current,
      dismissedIds: [...current.dismissedIds, id],
    }));
  }

  return {
    opportunities: visibleOpportunities,
    totalCount: opportunities.length,
    savedCount: feedState.savedIds.length,
    highFitCount: opportunities.filter((opportunity) => opportunity.score >= 85).length,
    query: feedState.query,
    topic: feedState.topic,
    sort: feedState.sort,
    view: feedState.view,
    savedIds: feedState.savedIds,
    setQuery,
    setTopic,
    setSort,
    setView,
    toggleSaved,
    dismiss,
    topics: ['All topics', ...opportunitiesConstants.topics] as const,
  };
}