'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, Search, Sparkles, ThumbsUp } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { commentsConstants } from '../constants';
import { useComments } from '../hooks/use-comments';
import type { CommentCategory } from '../types/comment';

export function CommentExplorer() {
  const { comments, filters, setCategory, setQuery } = useComments();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Comment intelligence · Demo data"
        title="Your comment performance"
        description="See which contributions create useful conversations, and where a sharper angle could improve the outcome."
        action={<Link href="/generate" className="inline-flex items-center gap-2 rounded-md bg-[#173b2d] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#24533e]"><Sparkles className="size-4" /> Create a comment</Link>}
      />

      <section className="space-y-4 border-y border-[#dce4dd] py-4" aria-label="Comment filters">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div role="group" aria-label="Filter by performance or strategy" className="flex min-w-0 gap-1 overflow-x-auto pb-1">
            {commentsConstants.filterOptions.map((category) => (
              <button key={category} type="button" onClick={() => setCategory(category as CommentCategory)} aria-pressed={filters.category === category} className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium transition-colors ${filters.category === category ? 'bg-[#173b2d] text-white' : 'text-[#5c6b61] hover:bg-white hover:text-[#244d37]'}`}>
                {category}
              </button>
            ))}
          </div>
          <label className="flex h-10 shrink-0 items-center gap-2 rounded-md border border-[#d7e0d8] bg-white px-3 lg:w-64">
            <Search className="size-4 text-[#78867d]" />
            <input value={filters.query} onChange={(event) => setQuery(event.target.value)} placeholder="Search comments" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8a968e]" aria-label="Search comments" />
          </label>
        </div>
        <p className="text-xs text-[#78867d]">{comments.length} analyzed contributions · Results are demo records</p>
      </section>

      {comments.length ? (
        <section className="grid gap-3" aria-label="Analyzed comments">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-lg border border-[#dce4dd] bg-white p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#69796e]">
                  <span className="rounded-full bg-[#edf3ee] px-2.5 py-1 font-medium capitalize text-[#45634f]">{comment.type}</span>
                  <span>Used: {comment.strategy.replaceAll('_', ' ')}</span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${comment.performance === 'Above average' ? 'bg-[#e6f3ea] text-[#246445]' : comment.performance === 'Needs a lift' ? 'bg-[#f8eddf] text-[#8a5c20]' : 'bg-[#edf0f4] text-[#586878]'}`}>{comment.performance}</span>
              </div>
              <Link href={`/comments/${comment.id}`} className="group mt-4 block">
                <p className="line-clamp-3 text-sm leading-relaxed text-[#33443a] group-hover:text-[#1c5236]">“{comment.content}”</p>
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#edf0ed] pt-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#4b5d51]">On: {comment.post.title}</p>
                  <p className="mt-1 text-[11px] text-[#7b887f]">{comment.post.author.name} · {comment.ageDays}d ago</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64756a]">
                  <span className="inline-flex items-center gap-1"><ThumbsUp className="size-3.5" />{comment.reactions}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" />{comment.replies}</span>
                  <span className="text-xs">Quality <strong className="ml-1 text-sm text-[#245d3e]">{comment.quality.overall}</strong></span>
                  <Link href={`/comments/${comment.id}`} aria-label={`View analysis for comment on ${comment.post.title}`} className="text-[#35674a] hover:text-[#193d2a]"><ArrowRight className="size-4" /></Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="border-t border-[#dce4dd] py-12 text-center">
          <h2 className="text-base font-semibold text-[#25372c]">No comments match those filters</h2>
          <p className="mt-2 text-sm text-[#758279]">Try another strategy or search term.</p>
        </div>
      )}
    </main>
  );
}