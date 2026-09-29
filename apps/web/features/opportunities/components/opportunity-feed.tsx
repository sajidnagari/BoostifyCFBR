'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, Sparkles, ThumbsUp } from 'lucide-react';
import { KpiCard, PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { useOpportunities } from '../hooks/use-opportunities';
import type { Opportunity } from '../types/opportunity';

function formatAge(hours: number) {
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function OpportunityRow({ opportunity, isSaved, onSave, onDismiss }: {
  opportunity: Opportunity;
  isSaved: boolean;
  onSave: () => void;
  onDismiss: () => void;
}) {
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-[#dce4dd] bg-white p-4 transition-colors hover:border-[#b6c9ba] md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[#e3ece5] text-xs font-bold text-[#2a5840]">{opportunity.authorInitials}</span>
          <div><p className="text-sm font-semibold text-[#26382d]">{opportunity.author}</p><p className="mt-0.5 text-xs text-[#78867d]">{opportunity.source} · {formatAge(opportunity.ageHours)}</p></div>
        </div>
        <span className="rounded-full bg-[#edf3ee] px-2.5 py-1 text-[11px] font-medium text-[#45634f]">{opportunity.topic}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href={`/opportunities/${opportunity.id}`} className="text-[15px] font-semibold leading-snug text-[#1d2d23] hover:text-[#256341] md:text-base">{opportunity.title}</Link>
          <p className="mt-2 line-clamp-3 max-w-195 text-sm leading-relaxed text-[#4d5e53]">{opportunity.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#78867d]">
            <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-3.5" />{opportunity.reactions} reactions</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5" />{opportunity.comments} comments</span>
            <span>{opportunity.engagementRate}% engagement</span>
          </div>
        </div>
        <aside className="grid w-15.5 shrink-0 justify-items-center gap-1 text-[#20583b]" aria-label={`Opportunity score ${opportunity.score} out of 100`}>
          <div className="relative grid size-14 place-items-center"><svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="#e7eee8" strokeWidth="4" /><motion.circle cx="24" cy="24" r="20" fill="none" stroke="#438060" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: opportunity.score / 100 }} transition={{ duration: 0.8, ease: 'easeOut' }} /></svg><strong className="text-base leading-none">{opportunity.score}</strong></div>
          <span className="text-[10px] text-[#76847a]">fit score</span>
        </aside>
      </div>
      <div className="mt-4 grid gap-3 rounded-md bg-[#f5f8f5] p-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#78867d]">Why this matters</p><p className="mt-1 text-xs leading-relaxed text-[#58695e]">{opportunity.rationale}</p><p className="mt-2 text-xs font-semibold text-[#365b42]">Suggested: {opportunity.strategy}</p></div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <button type="button" onClick={onDismiss} className="rounded px-2.5 py-2 text-xs text-[#66766b] hover:bg-white">Hide</button>
          <button type="button" onClick={onSave} aria-pressed={isSaved} className={`rounded border px-2.5 py-2 text-xs font-semibold ${isSaved ? 'border-[#9cbba2] bg-[#eaf3ec] text-[#285b3e]' : 'border-[#d4dfd6] bg-white text-[#516459] hover:border-[#9cbba2]'}`}>{isSaved ? 'Saved' : 'Save'}</button>
          <Link href={`/generate?postId=${opportunity.id}`} className="inline-flex items-center gap-1.5 rounded bg-[#173b2d] px-3 py-2 text-xs font-semibold text-white hover:bg-[#24533e]"><Sparkles className="size-3.5" />Generate</Link>
          <Link href={`/opportunities/${opportunity.id}`} aria-label="Open opportunity analysis" className="rounded border border-[#d4dfd6] bg-white p-2 text-[#49634f] hover:bg-[#f5f8f5]"><ArrowRight className="size-3.5" /></Link>
        </div>
      </div>
    </motion.article>
  );
}

export function OpportunityFeed() {
  const feed = useOpportunities();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Opportunity discovery · Demo data"
        title="Find the right conversation"
        description="Rank timely posts by audience fit, conversation activity, and the value your perspective could add."
        action={<Link href="/generate" className="inline-flex items-center gap-2 rounded-md border border-[#ccd9cf] bg-white px-3 py-2 text-xs font-semibold text-[#365b42] hover:bg-[#f6f8f6]"><Sparkles className="size-4" />Open comment studio</Link>}
      />

      <section className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4" aria-label="Opportunity overview">
        <KpiCard label="Live opportunities" value={`${feed.totalCount}`} detail="Ranked from your topics" />
        <KpiCard label="High fit" value={`${feed.highFitCount}`} detail="Score of 85 or higher" />
        <KpiCard label="Saved for later" value={`${feed.savedCount}`} detail="Your working shortlist" />
      </section>

      <section className="space-y-4 border-y border-[#dce4dd] py-4" aria-label="Filter opportunities">
        <div role="group" aria-label="Quick opportunity filters" className="flex gap-1 overflow-x-auto">
          {(['All', 'High opportunity', 'Recent'] as const).map((view) => <button key={view} type="button" onClick={() => feed.setView(view)} aria-pressed={feed.view === view} className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium ${feed.view === view ? 'bg-[#173b2d] text-white' : 'text-[#5c6b61] hover:bg-white'}`}>{view}</button>)}
        </div>
        <div className="grid grid-cols-2 items-end gap-3 md:grid-cols-[minmax(220px,1fr)_minmax(180px,0.45fr)_minmax(160px,0.35fr)] md:gap-4">
        <label className="col-span-2 grid gap-2 text-[13px] font-semibold text-gray-600 md:col-span-1">
          <span>Search posts</span>
          <input
            className="min-h-10.5 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            type="search"
            value={feed.query}
            onChange={(event) => feed.setQuery(event.target.value)}
            placeholder="Try a topic, author, or phrase"
          />
        </label>
        <label className="grid gap-2 text-[13px] font-semibold text-gray-600">
          <span>Topic</span>
          <select className="min-h-10.5 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20" value={feed.topic} onChange={(event) => feed.setTopic(event.target.value as typeof feed.topic)}>
            {feed.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-[13px] font-semibold text-gray-600">
          <span>Sort by</span>
          <select className="min-h-10.5 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20" value={feed.sort} onChange={(event) => feed.setSort(event.target.value as typeof feed.sort)}>
            <option value="highest-score">Highest fit</option>
            <option value="engagement">Engagement</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        </div>
      </section>

      <div className="mb-3 mt-7 flex items-baseline justify-between gap-4">
        <h2 className="m-0 text-lg font-semibold text-gray-900">Recommended conversations</h2>
        <span className="text-[13px] text-gray-500">{feed.opportunities.length} results</span>
      </div>

      {feed.opportunities.length ? (
        <section className="grid gap-3" aria-label="Recommended conversations">
          {feed.opportunities.map((opportunity) => (
            <OpportunityRow
              key={opportunity.id}
              opportunity={opportunity}
              isSaved={feed.savedIds.includes(opportunity.id)}
              onSave={() => feed.toggleSaved(opportunity.id)}
              onDismiss={() => feed.dismiss(opportunity.id)}
            />
          ))}
        </section>
      ) : (
        <div className="border-t border-gray-200 py-10">
          <h2 className="m-0 text-lg font-semibold text-gray-900">No conversations match these filters</h2>
          <p className="mb-0 mt-2 text-sm text-gray-500">Try a different search or topic to see more opportunities.</p>
        </div>
      )}
    </main>
  );
}