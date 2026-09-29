'use client';

import { useState } from 'react';
import { getAnalyticsData } from '../services/analytics.service';
import { initialAnalyticsRange } from '../store/analytics.store';
import type { AnalyticsRange } from '../types/analytics';

export function useAnalytics() {
  const [range, setRange] = useState<AnalyticsRange>(initialAnalyticsRange);
  return { range, data: getAnalyticsData(range), setRange };
}