'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MessageCircle, Repeat2, Sparkles, ThumbsUp, Users, Eye } from 'lucide-react';
import { Button } from '@companyio/platform-ui/dist/components/ui/button';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { getPostById } from '../services/posts.service';

export function PostDetail({ postId }: { postId: string }) {
  const post = getPostById(postId);
  if (!post) notFound();

  return (
    <main className="space-y-6">
      <Link href="/posts" className="inline-flex items-center gap-2 text-sm font-medium text-[#627267] hover:text-[#244d37]"><ArrowLeft className="size-4" /> Back to post library</Link>
      <PageHeader
        eyebrow={`${post.platform} · ${post.topic} · Demo analysis`}
        title="Post analysis"
        description="Understand the conversation context before deciding how to contribute."
        action={<Link href={`/generate?postId=${post.id}`}><Button className="gap-2 bg-[#173b2d] text-white hover:bg-[#24533e]"><Sparkles className="size-4" /> Generate a comment</Button></Link>}
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[#e3ece5] text-sm font-bold text-[#2a5840]">{post.author.initials}</span>
            <div><p className="text-sm font-semibold text-[#23352a]">{post.author.name}</p><p className="mt-0.5 text-xs text-[#758279]">{post.author.role} · {post.ageHours}h ago</p></div>
          </div>
          <h2 className="mt-6 text-xl font-semibold leading-snug text-[#1d2d23]">{post.title}</h2>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-[#415248]">{post.body}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#edf0ed] pt-4 text-sm text-[#64756a]">
            <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-4" />{post.reactions}</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-4" />{post.comments}</span>
            <span className="inline-flex items-center gap-1.5"><Repeat2 className="size-4" />{post.reposts}</span>
            <span className="inline-flex items-center gap-1.5"><Eye className="size-4" />{post.views.toLocaleString()} views</span>
          </div>
        </article>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-[#283a2f]">Opportunity score</h2><span className="rounded-full bg-[#e5f1e8] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2f6848]">Strong fit</span></div>
            <div className="mt-5 flex items-end gap-2"><span className="text-5xl font-semibold leading-none tracking-tight text-[#194a32]">{post.opportunityScore}</span><span className="pb-1 text-sm text-[#87938a]">/100</span></div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e8eee9]"><div className="h-full rounded-full bg-[#32815a]" style={{ width: `${post.opportunityScore}%` }} /></div>
            <p className="mt-4 text-sm leading-relaxed text-[#637168]">{post.analysisSummary}</p>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#283a2f]"><Users className="size-4 text-[#537761]" />Audience context</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#637168]">{post.audienceContext}</p>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#283a2f]"><Sparkles className="size-4 text-[#a67432]" />Recommended angle</h2>
            <p className="mt-3 text-sm font-medium text-[#34483a]">{post.suggestedStrategy}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#637168]">{post.conversationAngle}</p>
            <Link href={`/generate?postId=${post.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#285b41]">Explore this angle <ArrowUpRight className="size-4" /></Link>
          </article>
        </aside>
      </section>
    </main>
  );
}