'use client';

import { useState } from 'react';
import { getAnalyticsData } from '../../analytics/services/analytics.service';
import { getDashboardSnapshot } from '../services/dashboard.service';
import type { AnalyticsRange } from '../../analytics/types/analytics';

export function useDashboard() {
  const [range, setRange] = useState<AnalyticsRange>('30D');
  const [snapshot] = useState(getDashboardSnapshot);
  return { snapshot, analytics: getAnalyticsData(range), range, setRange };
}