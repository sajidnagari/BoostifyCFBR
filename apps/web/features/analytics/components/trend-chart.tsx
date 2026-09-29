'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { TrendPoint } from '../types/analytics';

export type TrendMetric = 'engagement' | 'comments' | 'replies' | 'visits';

const metricConfig: Record<TrendMetric, { label: string; color: string; suffix: string }> = {
  engagement: { label: 'Engagement rate', color: '#347a52', suffix: '%' },
  comments: { label: 'Comments', color: '#c38a43', suffix: '' },
  replies: { label: 'Replies', color: '#547a88', suffix: '' },
  visits: { label: 'Profile visits', color: '#ac6c5d', suffix: '' },
};

export function TrendChart({ points, metric, height = 230 }: { points: TrendPoint[]; metric: TrendMetric; height?: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const width = 720;
  const chartHeight = 210;
  const padding = { top: 16, right: 16, bottom: 28, left: 30 };
  const values = points.map((point) => point[metric]);
  const max = Math.max(...values, 1) * 1.18;
  const coordinates = values.map((value, index) => ({
    x: padding.left + index * (width - padding.left - padding.right) / Math.max(points.length - 1, 1),
    y: padding.top + (chartHeight - padding.top - padding.bottom) * (1 - value / max),
  }));
  const linePath = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  const areaPath = coordinates.length ? `${linePath} L ${last.x} ${chartHeight - padding.bottom} L ${first.x} ${chartHeight - padding.bottom} Z` : '';
  const config = metricConfig[metric];
  const activePoint = hoveredIndex === null ? null : points[hoveredIndex];

  return (
    <div className="min-w-0">
      <div className="mb-2 flex min-h-5 items-center justify-between text-xs">
        <span className="font-medium text-[#58695e]">{config.label}</span>
        <span aria-live="polite" className="font-semibold text-[#31463a]">{activePoint ? `${activePoint.label} · ${activePoint[metric]}${config.suffix}` : `${values[values.length - 1] ?? 0}${config.suffix} latest`}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${chartHeight}`} role="img" aria-label={`${config.label} trend`} className="block w-full overflow-visible" style={{ height }}>
        {[0, 1, 2, 3].map((line) => {
          const y = padding.top + (chartHeight - padding.top - padding.bottom) * line / 3;
          return <line key={line} x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#e8eee9" strokeWidth="1" />;
        })}
        <path d={areaPath} fill={config.color} fillOpacity="0.08" />
        <motion.path d={linePath} fill="none" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
        {coordinates.map((point, index) => <g key={`${points[index].label}-${index}`} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} tabIndex={0} aria-label={`${points[index].label}: ${values[index]}${config.suffix}`}><circle cx={point.x} cy={point.y} r="10" fill="transparent" /><circle cx={point.x} cy={point.y} r={hoveredIndex === index ? 5 : 3.5} fill="white" stroke={config.color} strokeWidth="2" /><title>{`${points[index].label}: ${values[index]}${config.suffix}`}</title></g>)}
        {points.map((point, index) => <text key={point.label} x={coordinates[index].x} y={chartHeight - 5} textAnchor="middle" fill="#819087" fontSize="10">{point.label}</text>)}
      </svg>
    </div>
  );
}