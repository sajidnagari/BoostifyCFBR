'use client';

import { useState } from 'react';
import { strategyFilters } from '../constants';
import { getStrategyRecords, getTopStrategyRecommendation } from '../services/strategies.service';

export function useStrategies() {
  const [filter, setFilter] = useState<(typeof strategyFilters)[number]>('All strategies');
  const strategies = getStrategyRecords();
  const visibleStrategies = filter === 'Strongest replies'
    ? strategies.filter((strategy) => strategy.comments && strategy.averageReplies >= 3)
    : filter === 'Needs more data'
      ? strategies.filter((strategy) => !strategy.comments)
      : strategies;
  return { strategies: visibleStrategies, filter, setFilter, recommendation: getTopStrategyRecommendation() };
}