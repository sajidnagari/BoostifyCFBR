'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock3, Sparkles, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useProfile } from '../../profile/hooks/use-profile';
import { TrendChart, type TrendMetric } from '../../analytics/components/trend-chart';
import { analyticsConstants } from '../../analytics/constants';
import { useDashboard } from '../hooks/use-dashboard';

const rangeLabels: Record<string, string> = { '7D': '7 days', '30D': '30 days', '90D': '90 days', ALL: 'All time' };
const strategyColors = ['#347a52', '#c38a43', '#547a88', '#ac6c5d', '#72865d', '#86775f'];

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}

function compactNumber(value: string) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 1000 ? `${(numericValue / 1000).toFixed(1)}k` : value;
}

export function DashboardOverview() {
  const { profile } = useProfile();
  const dashboard = useDashboard();
  const [trendMetric, setTrendMetric] = useState<TrendMetric>('engagement');
  const topStrategy = [...dashboard.snapshot.analytics.strategyPerformance].sort((first, second) => second.averageReplies - first.averageReplies)[0];

  return (
    <main className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-[11px] font-semibold uppercase tracking-wide text-[#6f8074]">Comment intelligence · Demo data</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d2d23] md:text-3xl">{greeting()}, {profile.name.split(' ')[0]}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64746a]">Your commenting strategy is creating measurable conversations. Here is what’s moving, where to engage next, and what to learn from it.</p></div>
        <div className="flex flex-wrap gap-2">
          <Link href="/opportunities" className="inline-flex h-10 items-center gap-2 rounded-md bg-[#173b2d] px-3.5 text-xs font-semibold text-white hover:bg-[#24533e]"><Sparkles className="size-4" />Find opportunities</Link>
          <Link href="/posts" className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d1ddd3] bg-white px-3.5 text-xs font-semibold text-[#49604f] hover:bg-[#f5f8f5]">Analyze content</Link>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-6" aria-label="Comment performance indicators">
        {dashboard.snapshot.metrics.map((metric, index) => <motion.article key={metric.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }} className="min-w-0 rounded-lg border border-[#dce4dd] bg-white p-3.5 md:p-4"><p className="truncate text-[11px] font-medium text-[#78867d]">{metric.label}</p><p className="mt-2 truncate text-xl font-semibold tracking-tight text-[#24372b] md:text-2xl">{compactNumber(metric.value)}</p><p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-[#748178]">{metric.detail}</p><p className="mt-2 border-t border-[#edf0ed] pt-2 text-[10px] font-medium text-[#42644b]">{metric.change}</p></motion.article>)}
      </section>

      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
        <article className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Engagement trend</h2><p className="mt-1 text-xs text-[#78867d]">Conversation outcomes · {rangeLabels[dashboard.range]}</p></div><div className="flex rounded-md border border-[#d5dfd7] bg-[#f8faf8] p-1" role="group" aria-label="Chart metric">{(['engagement', 'comments', 'replies'] as const).map((metric) => <button key={metric} type="button" onClick={() => setTrendMetric(metric)} aria-pressed={trendMetric === metric} className={`rounded px-2 py-1.5 text-[10px] capitalize ${trendMetric === metric ? 'bg-white font-semibold text-[#365b42] shadow-sm' : 'text-[#718077]'}`}>{metric}</button>)}</div></div>
          <div className="mt-3"><TrendChart points={dashboard.analytics.trend} metric={trendMetric} height={240} /></div>
          <div className="mt-2 flex items-center justify-between border-t border-[#edf0ed] pt-3"><p className="text-[10px] text-[#87938a]">Illustrative sample, not live account analytics</p><div className="flex gap-1">{analyticsConstants.periods.map((period) => <button key={period} onClick={() => dashboard.setRange(period)} aria-pressed={dashboard.range === period} className={`rounded px-2 py-1 text-[10px] ${dashboard.range === period ? 'bg-[#e9f0ea] font-semibold text-[#376347]' : 'text-[#7b887f] hover:bg-[#f4f7f4]'}`}>{period}</button>)}</div></div>
        </article>

        <article className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-5">
          <div className="flex items-start justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Strategy performance</h2><p className="mt-1 text-xs text-[#78867d]">Average comment quality</p></div><Link href="/strategies" className="text-[10px] font-semibold text-[#3c6849]">All strategies</Link></div>
          <div className="mt-6 grid gap-4">{dashboard.snapshot.analytics.strategyPerformance.slice(0, 5).map((strategy, index) => <div key={strategy.label}><div className="mb-1.5 flex items-center justify-between gap-3"><span className="truncate text-xs capitalize text-[#56675b]">{strategy.label}</span><span className="shrink-0 text-[10px] text-[#829087]">{strategy.averageReplies} replies · <strong className="text-[#405a47]">{strategy.averageQuality}</strong></span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#edf1ed]"><motion.div initial={{ width: 0 }} animate={{ width: `${strategy.averageQuality}%` }} transition={{ duration: 0.75, delay: index * 0.06 }} className="h-full rounded-full" style={{ backgroundColor: strategyColors[index % strategyColors.length] }} /></div></div>)}</div>
          <div className="mt-5 border-t border-[#edf0ed] pt-4 text-xs"><span className="text-[#78867d]">Best reply driver </span><strong className="capitalize text-[#365b42]">{topStrategy?.label ?? '—'}</strong></div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <article className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Top opportunities</h2><p className="mt-1 text-xs text-[#78867d]">Ranked by fit, activity, and timing</p></div><Link href="/opportunities" className="text-[10px] font-semibold text-[#3c6849]">Open feed <ArrowRight className="ml-0.5 inline size-3" /></Link></div>
          <div className="divide-y divide-[#edf0ed]">{dashboard.snapshot.opportunities.map((opportunity) => <div key={opportunity.id} className="flex items-start gap-3 py-4 first:pt-1 last:pb-1"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e3ece5] text-[10px] font-bold text-[#2a5840]">{opportunity.authorInitials}</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold leading-snug text-[#2d4033]">{opportunity.title}</p><p className="mt-1 line-clamp-1 text-[10px] text-[#7c8980]">{opportunity.author} · {opportunity.topic}</p><Link href={`/generate?postId=${opportunity.id}`} className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#326245]">Use {opportunity.strategy.toLowerCase()} <ArrowRight className="size-3" /></Link></div><span className="rounded bg-[#eaf2eb] px-2 py-1 text-xs font-semibold text-[#2a6846]">{opportunity.score}</span></div>)}</div>
        </article>

        <div className="grid content-start gap-5">
          <article className="overflow-hidden rounded-lg border border-[#d4dfd4] bg-[#eaf0e9]">
            <div className="h-1 bg-[#c38a43]" />
            <div className="p-5"><p className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5c6f5e]"><Sparkles className="size-3.5 text-[#a87936]" />Signal from your sample</p><h2 className="mt-4 text-base font-semibold leading-snug text-[#263c2e]">{dashboard.snapshot.insight.title}</h2><p className="mt-2 text-sm leading-relaxed text-[#56695a]">{dashboard.snapshot.insight.description}</p><p className="mt-4 border-t border-[#d1ddd2] pt-3 text-[10px] text-[#758276]">{dashboard.snapshot.insight.evidence}</p><Link href="/analytics" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#315d40]">Explore performance <ArrowRight className="size-3.5" /></Link></div>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold text-[#293c30]">Recent analysis</h2><Clock3 className="size-4 text-[#849087]" /></div>
            <div className="grid gap-3">{dashboard.snapshot.recentComments.map((comment) => <Link key={comment.id} href={`/comments/${comment.id}`} className="group flex items-start gap-2.5"><span className={`mt-1 size-2 shrink-0 rounded-full ${comment.quality.overall >= 85 ? 'bg-[#4c8b62]' : comment.quality.overall < 70 ? 'bg-[#c99048]' : 'bg-[#718c98]'}`} /><span className="min-w-0 flex-1"><span className="block line-clamp-1 text-xs leading-relaxed text-[#56675b] group-hover:text-[#295c3e]">{comment.content}</span><span className="mt-1 flex items-center justify-between gap-2 text-[10px] text-[#87938a]"><span>{comment.type} · {comment.ageDays}d ago</span><span className="inline-flex items-center gap-1"><ThumbsUp className="size-3" />{comment.reactions}</span></span></span></Link>)}</div>
            <Link href="/comments" className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-[#3c6849]">All comment analysis <ArrowRight className="size-3" /></Link>
          </article>
        </div>
      </section>

      <p className="flex items-center gap-1.5 text-[10px] text-[#89948b]"><ArrowUpRight className="size-3" />{dashboard.snapshot.demoNote}</p>
    </main>
  );
}