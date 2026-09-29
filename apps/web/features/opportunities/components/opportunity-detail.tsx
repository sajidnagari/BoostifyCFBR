import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MessageCircle, Repeat2, Sparkles, ThumbsUp } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { getOpportunityById } from '../services/opportunity.service';
import { getPostById } from '../../posts/services/posts.service';

const signalLabels: Record<string, string> = {
  engagement: 'Engagement velocity',
  audienceRelevance: 'Audience relevance',
  discussionActivity: 'Discussion activity',
  topicRelevance: 'Topic alignment',
  authorInfluence: 'Author reach',
  recency: 'Recency',
  commentVisibility: 'Comment visibility',
};

export function OpportunityDetail({ opportunityId }: { opportunityId: string }) {
  const opportunity = getOpportunityById(opportunityId);
  const post = getPostById(opportunityId);
  if (!opportunity || !post) notFound();

  return (
    <main className="space-y-6">
      <Link href="/opportunities" className="inline-flex items-center gap-2 text-sm font-medium text-[#627267] hover:text-[#244d37]"><ArrowLeft className="size-4" /> Back to opportunities</Link>
      <PageHeader
        eyebrow={`${opportunity.topic} · Opportunity analysis · Demo data`}
        title="A conversation worth entering"
        description="Review the post and its fit signals, then choose an angle that adds useful context."
        action={<Link href={`/generate?postId=${post.id}`} className="inline-flex items-center gap-2 rounded-md bg-[#173b2d] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#24533e]"><Sparkles className="size-4" />Generate a comment</Link>}
      />

      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <div className="space-y-5">
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-7">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-[#e3ece5] text-sm font-bold text-[#2a5840]">{post.author.initials}</span><div><p className="text-sm font-semibold text-[#26382d]">{post.author.name}</p><p className="mt-0.5 text-xs text-[#78867d]">{post.author.role} · {opportunity.ageHours}h ago · {post.platform}</p></div></div>
            <h2 className="mt-6 text-xl font-semibold leading-snug text-[#1d2d23]">{post.title}</h2>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-[#415248]">{post.body}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#edf0ed] pt-4 text-sm text-[#64756a]">
              <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-4" />{post.reactions} reactions</span>
              <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-4" />{post.comments} comments</span>
              <span className="inline-flex items-center gap-1.5"><Repeat2 className="size-4" />{post.reposts} reposts</span>
              <span>{post.engagementRate}% engagement</span>
            </div>
          </article>

          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <h2 className="text-sm font-semibold text-[#293c30]">Why this opportunity matters</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5e6e63]">{opportunity.rationale}</p>
            <div className="mt-5 rounded-md bg-[#f3f7f3] p-4"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#718276]">Audience context</p><p className="mt-2 text-sm leading-relaxed text-[#4d6153]">{post.audienceContext}</p></div>
          </article>

          <article className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Potential comment angle</h2><p className="mt-1 text-xs text-[#78867d]">A starting point, not a script</p></div><span className="rounded-full bg-[#edf3ee] px-2.5 py-1 text-[11px] font-medium text-[#45634f]">{opportunity.strategy}</span></div>
            <p className="mt-4 text-sm leading-relaxed text-[#4d6153]">{post.conversationAngle}</p>
            <Link href={`/generate?postId=${post.id}`} className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#173b2d] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#24533e]"><Sparkles className="size-4" />Explore this angle <ArrowRight className="size-3.5" /></Link>
          </article>
        </div>

        <aside className="grid content-start gap-5">
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-[#293c30]">Opportunity fit</p><p className="mt-1 text-xs text-[#78867d]">Weighted signals · out of 100</p></div><strong className="text-3xl font-semibold text-[#20583b]">{opportunity.score}</strong></div>
            <div className="mt-5 grid gap-3">
              {Object.entries(opportunity.signals).map(([signal, value]) => <div key={signal}><div className="mb-1 flex justify-between text-[11px]"><span className="text-[#66766b]">{signalLabels[signal] ?? signal}</span><span className="font-semibold text-[#45594a]">{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e9efea]"><div className="h-full rounded-full bg-[#548366]" style={{ width: `${value}%` }} /></div></div>)}
            </div>
          </article>
          <article className="rounded-lg border border-[#dce4dd] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#78867d]">Post analysis</p>
            <p className="mt-3 text-sm leading-relaxed text-[#56675c]">{post.analysisSummary}</p>
            <Link href={`/posts/${post.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#326245]">Open full post analysis <ArrowRight className="size-3.5" /></Link>
          </article>
        </aside>
      </section>
    </main>
  );
}