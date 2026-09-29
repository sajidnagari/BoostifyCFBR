'use client';

import { ArrowUpRight, ChartNoAxesCombined, MessageCircle, UserRound, UsersRound } from 'lucide-react';
import { KpiCard, PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { analyticsConstants } from '../constants';
import { useAnalytics } from '../hooks/use-analytics';
import { TrendChart, type TrendMetric } from './trend-chart';

const rangeLabels: Record<string, string> = { '7D': '7 days', '30D': '30 days', '90D': '90 days', ALL: 'All time' };
const strategyColors = ['bg-[#347a52]', 'bg-[#c38a43]', 'bg-[#547a88]', 'bg-[#ac6c5d]', 'bg-[#72865d]', 'bg-[#86775f]'];

export function AnalyticsOverview() {
  const { range, data, setRange } = useAnalytics();
  const metrics: Array<{ key: TrendMetric; label: string; icon: typeof ChartNoAxesCombined }> = [
    { key: 'engagement', label: 'Engagement', icon: ChartNoAxesCombined },
    { key: 'comments', label: 'Comments', icon: MessageCircle },
    { key: 'replies', label: 'Replies', icon: UsersRound },
    { key: 'visits', label: 'Profile visits', icon: UserRound },
  ];

  return (
    <main className="space-y-6">
      <PageHeader eyebrow="Performance intelligence · Demo data" title="Measure what moves the conversation" description="Review engagement outcomes by period, strategy, topic, and comment shape." />
      <section className="flex flex-wrap items-center justify-between gap-3 border-y border-[#dce4dd] py-3" aria-label="Analytics date range">
        <p className="text-xs text-[#738077]">Showing demo activity · {rangeLabels[range]}</p>
        <div role="group" aria-label="Date range" className="flex rounded-md border border-[#d5dfd7] bg-white p-1">
          {analyticsConstants.periods.map((period) => <button key={period} type="button" onClick={() => setRange(period)} aria-pressed={range === period} className={`rounded px-3 py-1.5 text-xs font-medium ${range === period ? 'bg-[#173b2d] text-white' : 'text-[#64756a] hover:bg-[#f3f6f3]'}`}>{period}</button>)}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Analytics summary">
        <KpiCard label="Comments analyzed" value={`${data.commentsAnalyzed}`} detail="Across the demo sample" />
        <KpiCard label="Average engagement" value={`${data.averageEngagement}%`} detail="Across linked posts" />
        <KpiCard label="Replies generated" value={`${data.replies}`} detail="On analyzed comments" />
        <KpiCard label="Profile visits" value={`${data.profileVisits}`} detail="Attributed in sample" />
      </section>

      <section className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-6" aria-label="Engagement trends">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Performance over time</h2><p className="mt-1 text-xs text-[#78867d]">Engagement, comments, replies, and profile visits · {rangeLabels[range]}</p></div><span className="inline-flex items-center gap-1.5 text-[10px] text-[#76847a]"><span className="size-2 rounded-full bg-[#347a52]" />Interactive demo series</span></div>
        <div className="grid gap-8 xl:grid-cols-2">{metrics.map((metric) => <div key={metric.key}><TrendChart points={data.trend} metric={metric.key} height={210} /></div>)}</div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
          <div className="mb-5"><h2 className="text-sm font-semibold text-[#293c30]">Strategy performance</h2><p className="mt-1 text-xs text-[#78867d]">Quality and replies in the analyzed comment sample.</p></div>
          <div className="grid gap-4">{data.strategyPerformance.map((item, index) => <div key={item.label} className="grid grid-cols-[minmax(120px,0.8fr)_1.2fr_auto] items-center gap-3"><div className="min-w-0"><p className="truncate text-xs font-medium capitalize text-[#4f6155]">{item.label}</p><p className="mt-0.5 text-[10px] text-[#87938a]">{item.count} comments · {item.averageReplies} replies avg.</p></div><div className="h-2 overflow-hidden rounded-full bg-[#edf1ed]"><div className={`h-full rounded-full ${strategyColors[index % strategyColors.length]}`} style={{ width: `${item.averageQuality}%` }} /></div><strong className="text-xs text-[#38523f]">{item.averageQuality}</strong></div>)}</div>
        </article>
        <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
          <div className="mb-5"><h2 className="text-sm font-semibold text-[#293c30]">Topic and comment-shape signals</h2><p className="mt-1 text-xs text-[#78867d]">Engagement by post topic and average quality by comment length.</p></div>
          <div className="grid gap-5 md:grid-cols-2">
            <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[#7a887e]">Topics</p><div className="grid gap-3">{data.topicPerformance.map((item, index) => <div key={item.topic}><div className="mb-1 flex justify-between gap-2 text-[11px]"><span className="truncate text-[#57685d]">{item.topic}</span><span className="font-semibold text-[#355640]">{item.engagement}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#edf1ed]"><div className={`h-full rounded-full ${strategyColors[index % strategyColors.length]}`} style={{ width: `${Math.min(item.engagement * 10, 100)}%` }} /></div></div>)}</div></div>
            <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[#7a887e]">Comment length</p><div className="grid gap-3">{data.lengthPerformance.map((item, index) => <div key={item.label}><div className="mb-1 flex justify-between gap-2 text-[11px]"><span className="truncate text-[#57685d]">{item.label.split(' · ')[0]}</span><span className="font-semibold text-[#355640]">{item.quality || '—'}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#edf1ed]"><div className={`h-full rounded-full ${strategyColors[(index + 2) % strategyColors.length]}`} style={{ width: `${item.quality}%` }} /></div></div>)}</div></div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#edf0ed] pt-4 text-xs"><span className="text-[#77847b]">Average length in demo sample</span><span className="font-semibold text-[#3f5546]">{data.averageCommentLength} words</span></div>
        </article>
      </section>
      <p className="flex items-center gap-1.5 text-[11px] text-[#89948b]"><ArrowUpRight className="size-3.5" />Demo analytics are illustrative and derived from local seed records; they are not connected to a social platform.</p>
    </main>
  );
}