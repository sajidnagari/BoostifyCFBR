'use client';

import Link from 'next/link';
import { ArrowDownUp, ArrowRight, MessageCircle, Search, Sparkles, ThumbsUp } from 'lucide-react';
import { Button } from '@companyio/platform-ui/dist/components/ui/button';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { usePosts } from '../hooks/use-posts';

export function PostExplorer() {
  const { posts, filters, topics, setQuery, setTopic, setSort } = usePosts();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Content intelligence · Demo data"
        title="Post library"
        description="Review conversations, understand their engagement context, and move from analysis to a thoughtful response."
        action={<Link href="/opportunities"><Button size="sm" className="gap-2 bg-[#173b2d] text-white hover:bg-[#24533e]"><Sparkles className="size-4" /> Discover opportunities</Button></Link>}
      />

      <section className="flex flex-col gap-3 border-y border-[#dce4dd] py-4 md:flex-row md:items-center md:justify-between" aria-label="Post filters">
        <label className="flex min-h-10 min-w-0 items-center gap-2 rounded-md border border-[#d7e0d8] bg-white px-3 md:max-w-sm md:flex-1">
          <Search className="size-4 shrink-0 text-[#78867d]" />
          <input value={filters.query} onChange={(event) => setQuery(event.target.value)} placeholder="Search posts, authors, topics" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8a968e]" aria-label="Search posts" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="post-topic">Filter by topic</label>
          <select id="post-topic" value={filters.topic} onChange={(event) => setTopic(event.target.value as typeof filters.topic)} className="h-10 rounded-md border border-[#d7e0d8] bg-white px-3 text-sm text-[#43554a]">
            {topics.map((topic) => <option key={topic}>{topic}</option>)}
          </select>
          <label className="sr-only" htmlFor="post-sort">Sort posts</label>
          <select id="post-sort" value={filters.sort} onChange={(event) => setSort(event.target.value as typeof filters.sort)} className="h-10 rounded-md border border-[#d7e0d8] bg-white px-3 text-sm text-[#43554a]">
            <option value="opportunity">Opportunity</option>
            <option value="engagement">Engagement</option>
            <option value="recent">Most recent</option>
          </select>
          <span className="inline-flex items-center gap-1.5 px-2 text-xs text-[#758279]"><ArrowDownUp className="size-3.5" />{posts.length} posts</span>
        </div>
      </section>

      {posts.length ? (
        <section className="grid gap-3" aria-label="Posts">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg border border-[#dce4dd] bg-white p-4 transition-colors hover:border-[#b5c6b9] md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e3ece5] text-xs font-bold text-[#2a5840]">{post.author.initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#23352a]">{post.author.name}<span className="ml-2 font-normal text-[#78867d]">{post.author.handle}</span></p>
                    <p className="mt-0.5 truncate text-xs text-[#758279]">{post.author.role} · {post.ageHours}h ago · {post.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#edf3ee] px-2.5 py-1 text-[11px] font-medium text-[#45634f]">{post.topic}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${post.analysisStatus === 'Analyzed' ? 'bg-[#e7f3eb] text-[#286347]' : 'bg-[#fbf0dc] text-[#805c25]'}`}>{post.analysisStatus}</span>
                </div>
              </div>

              <Link href={`/posts/${post.id}`} className="group mt-4 block">
                <h2 className="text-[15px] font-semibold leading-snug text-[#1d2d23] group-hover:text-[#256341]">{post.title}</h2>
                <p className="mt-2 line-clamp-2 max-w-4xl text-sm leading-relaxed text-[#56655b]">{post.body}</p>
              </Link>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#edf0ed] pt-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#66766b]">
                  <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-3.5" />{post.reactions.toLocaleString()} reactions</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5" />{post.comments} comments</span>
                  <span>{post.engagementRate}% engagement</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#64756a]">Fit <strong className="ml-1 text-sm text-[#215a3d]">{post.opportunityScore}</strong></span>
                  <Link href={`/posts/${post.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#285b41] hover:text-[#163e2a]">View analysis <ArrowRight className="size-3.5" /></Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="border-t border-[#dce4dd] py-12 text-center">
          <h2 className="text-base font-semibold text-[#25372c]">No posts match those filters</h2>
          <p className="mt-2 text-sm text-[#758279]">Try a broader search or choose another topic.</p>
        </div>
      )}
    </main>
  );
}