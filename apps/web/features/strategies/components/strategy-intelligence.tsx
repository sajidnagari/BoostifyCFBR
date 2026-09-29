'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { strategyFilters } from '../constants';
import { useStrategies } from '../hooks/use-strategies';

export function StrategyIntelligence() {
  const { strategies, filter, setFilter, recommendation } = useStrategies();
  const [expandedId, setExpandedId] = useState('experience');

  return (
    <main className="space-y-6">
      <PageHeader eyebrow="Strategy intelligence · Demo sample" title="Learn what earns a reply" description="Compare comment approaches by quality and conversation outcomes, then apply the right strategy to the post in front of you." action={<Link href="/analytics" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#356449]">Analytics <ArrowRight className="size-3.5" /></Link>} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.75fr)]">
        <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-sm font-semibold text-[#293c30]">Your strategy mix</h2><p className="mt-1 text-xs text-[#78867d]">Observed comments only; untested strategies are called out.</p></div><div role="group" aria-label="Filter strategies" className="flex rounded-md border border-[#d5dfd7] bg-[#f8faf8] p-1">{strategyFilters.map((option) => <button key={option} type="button" onClick={() => setFilter(option)} aria-pressed={filter === option} className={`rounded px-2.5 py-1.5 text-[10px] font-medium ${filter === option ? 'bg-white text-[#365b42] shadow-sm' : 'text-[#758279]'}`}>{option}</button>)}</div></div>
          <div className="mt-5 divide-y divide-[#edf0ed]">
            {strategies.map((strategy) => <article key={strategy.id} className="py-4 first:pt-1 last:pb-1">
              <button type="button" onClick={() => setExpandedId((current) => current === strategy.id ? '' : strategy.id)} aria-expanded={expandedId === strategy.id} className="flex w-full items-center gap-3 text-left">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#edf3ee] text-xs font-semibold text-[#496650]">{strategy.comments || '—'}</span>
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-[#34483a]">{strategy.label}</span><span className="mt-1 block text-[10px] text-[#78867d]">{strategy.sampleStatus}{strategy.comments ? ` · ${strategy.comments} analyzed` : ''}</span></span>
                <span className="hidden text-right sm:block"><span className="block text-xs font-semibold text-[#365b42]">{strategy.averageQuality || '—'}{strategy.averageQuality ? ' quality' : ''}</span><span className="mt-1 block text-[10px] text-[#78867d]">{strategy.averageReplies || '—'} replies avg.</span></span>
                <ChevronDown className={`size-4 shrink-0 text-[#7a887e] transition-transform ${expandedId === strategy.id ? 'rotate-180' : ''}`} />
              </button>
              {expandedId === strategy.id && <div className="ml-11 mt-4 grid gap-4 border-l-2 border-[#dce8dd] pl-4 sm:grid-cols-2"><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#78867d]">What it does</p><p className="mt-1.5 text-xs leading-relaxed text-[#596a5e]">{strategy.description}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#78867d]">When to use it</p><p className="mt-1.5 text-xs leading-relaxed text-[#596a5e]">{strategy.when}</p></div><div className="rounded-md bg-[#f5f8f5] p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#78867d]">Example angle</p><p className="mt-2 text-xs leading-relaxed text-[#506155]">“{strategy.example}”</p></div></div>}
            </article>)}
          </div>
        </article>

        <aside className="grid content-start gap-5">
          <article className="rounded-lg border border-[#d4dfd4] bg-[#eaf0e9] p-5 md:p-6">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5c6f5e]"><Sparkles className="size-3.5 text-[#a87936]" />Recommendation · Demo sample</p>
            <h2 className="mt-4 text-base font-semibold leading-snug text-[#263c2e]">A strategy to test next</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#56695a]">{recommendation.suggestion}</p>
            <div className="mt-5 border-t border-[#d1ddd2] pt-4"><p className="text-[10px] text-[#79867a]">Highest average quality</p><p className="mt-1 text-sm font-semibold text-[#365b42]">{recommendation.qualityStrategy?.label ?? 'Not enough sample yet'}</p></div>
            <Link href="/opportunities" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#315d40]">Apply to an opportunity <ArrowRight className="size-3.5" /></Link>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <h2 className="text-xs font-semibold text-[#3b5042]">How to read this page</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#758279]">A small demo sample can suggest what to test, not prove causation. Compare similar posts and keep your writing truthful to your own experience.</p>
          </article>
        </aside>
      </section>
    </main>
  );
}