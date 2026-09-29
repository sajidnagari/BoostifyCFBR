'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Check, Clipboard, Lightbulb, MessageCircle, Sparkles, ThumbsUp } from 'lucide-react';
import { Button } from '@companyio/platform-ui/dist/components/ui/button';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { getCommentById } from '../services/comments.service';

const scoreLabels = [
  ['relevance', 'Relevance'],
  ['value', 'Value added'],
  ['originality', 'Originality'],
  ['conversation', 'Conversation potential'],
  ['clarity', 'Clarity'],
  ['expertise', 'Expertise fit'],
] as const;

export function CommentDetail({ commentId }: { commentId: string }) {
  const comment = getCommentById(commentId);
  const [copied, setCopied] = useState(false);
  if (!comment) notFound();
  const commentContent = comment.content;

  async function copyComment() {
    await navigator.clipboard.writeText(commentContent);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="space-y-6">
      <Link href="/comments" className="inline-flex items-center gap-2 text-sm font-medium text-[#627267] hover:text-[#244d37]"><ArrowLeft className="size-4" /> Back to comment intelligence</Link>
      <PageHeader
        eyebrow="Comment analysis · Demo record"
        title="Why this comment performed this way"
        description="A quality breakdown against the post context and the response it generated."
        action={<Link href={`/generate?postId=${comment.postId}&commentId=${comment.id}`}><Button className="gap-2 bg-[#173b2d] text-white hover:bg-[#24533e]"><Sparkles className="size-4" /> Improve with AI</Button></Link>}
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.85fr)]">
        <div className="space-y-5">
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-[11px] font-semibold uppercase tracking-wide text-[#78867d]">Your comment</p><p className="mt-3 text-[15px] leading-7 text-[#34463b]">“{comment.content}”</p></div>
              <button type="button" onClick={copyComment} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#dce4dd] px-2.5 py-2 text-xs font-medium text-[#506156] hover:bg-[#f5f8f5]" aria-label="Copy comment">{copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 border-t border-[#edf0ed] pt-4 text-xs text-[#66766b]">
              <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-3.5" />{comment.reactions} reactions</span>
              <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5" />{comment.replies} replies</span>
              <span>{comment.profileVisits} profile visits</span>
              <span>{comment.ageDays} days ago</span>
            </div>
          </article>

          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <div className="flex items-center justify-between gap-3"><div><p className="text-[11px] font-semibold uppercase tracking-wide text-[#78867d]">Original post</p><h2 className="mt-2 text-base font-semibold leading-snug text-[#26382d]">{comment.post.title}</h2></div><span className="rounded-full bg-[#edf3ee] px-2.5 py-1 text-[11px] text-[#45634f]">{comment.post.topic}</span></div>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#627168]">{comment.post.body}</p>
            <Link href={`/posts/${comment.post.id}`} className="mt-4 inline-flex text-xs font-semibold text-[#2d6244] hover:text-[#193d2a]">Open post analysis <ArrowLeft className="ml-1 size-3.5 rotate-180" /></Link>
          </article>

          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#293c30]"><Lightbulb className="size-4 text-[#a67432]" />Why it performed this way</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5e6e63]">{comment.reasoning}</p>
            <div className="mt-5 border-t border-[#edf0ed] pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#78867d]">How to improve it</p><p className="mt-2 text-sm leading-relaxed text-[#46594c]">{comment.improvement}</p></div>
          </article>
        </div>

        <aside className="grid content-start gap-5">
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <div className="flex items-end justify-between"><div><p className="text-sm font-semibold text-[#293c30]">Comment quality</p><p className="mt-1 text-xs text-[#78867d]">Six performance dimensions</p></div><strong className="text-4xl font-semibold leading-none text-[#20583b]">{comment.quality.overall}<span className="ml-1 text-sm font-normal text-[#89958c">/100</span></strong></div>
            <div className="mt-6 grid gap-4">
              {scoreLabels.map(([key, label]) => {
                const value = comment.quality[key];
                return <div key={key}><div className="mb-1.5 flex justify-between text-xs"><span className="text-[#58695e]">{label}</span><strong className="text-[#354b3b]">{value}</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e9efea]"><div className="h-full rounded-full bg-[#448363]" style={{ width: `${value}%` }} /></div></div>;
              })}
            </div>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#78867d]">Alternative version</p>
            <p className="mt-3 text-sm leading-relaxed text-[#46594c]">“{comment.alternative}”</p>
            <Link href={`/generate?postId=${comment.postId}&commentId=${comment.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6244]"><Sparkles className="size-3.5" />Build on this version</Link>
          </article>
        </aside>
      </section>
    </main>
  );
}