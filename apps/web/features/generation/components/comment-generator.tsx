'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Check, Clipboard, LoaderCircle, MessageSquareText, RotateCw, Sparkles, WandSparkles } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { generationLengths, generationStrategies } from '../constants';
import { useCommentGenerator } from '../hooks/use-comment-generator';
import type { RefinementMode } from '../types/generation';

const labelClass = 'text-xs font-semibold text-[#4f6055]';
const fieldClass = 'mt-1.5 w-full rounded-md border border-[#d5dfd7] bg-white px-3 text-sm text-[#26382d] outline-none focus:border-[#4f8061] focus:ring-2 focus:ring-[#4f8061]/15';
const refinementActions: Array<{ mode: RefinementMode; label: string }> = [
  { mode: 'improve', label: 'Improve' },
  { mode: 'shorten', label: 'Shorten' },
  { mode: 'natural', label: 'More natural' },
  { mode: 'technical', label: 'More technical' },
  { mode: 'conversational', label: 'More conversational' },
];

export function CommentGenerator({ postId, commentId }: { postId?: string; commentId?: string }) {
  const generator = useCommentGenerator(postId, commentId);
  const [copiedId, setCopiedId] = useState('');

  async function copyOption(id: string) {
    await generator.copy(id);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(''), 1800);
  }

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Comment generation · Demo AI"
        title="Write with intent"
        description="Build a useful response around the post, your expertise, and a clear conversation strategy. Nothing is published automatically."
        action={<Link href="/settings/profile" className="text-xs font-semibold text-[#39664a] hover:text-[#183d2b]">Edit expertise profile</Link>}
      />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <section className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6" aria-label="Comment generation inputs">
          <div className="mb-5 flex items-center justify-between border-b border-[#edf0ed] pb-4">
            <div><h2 className="text-sm font-semibold text-[#293c30]">Set your direction</h2><p className="mt-1 text-xs text-[#78867d]">Specific input produces more useful options.</p></div>
            <span className="rounded-full bg-[#f6f0e5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#876337]">Demo AI</span>
          </div>

          <div className="grid gap-4">
            {generator.postTitle && <p className="-mb-2 text-xs text-[#738077]">Responding to: <strong className="text-[#4b5d51]">{generator.postTitle}</strong></p>}
            {generator.sourceComment && <div className="rounded-md bg-[#f3f6f3] p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#79867d]">Improving your existing comment</p><p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#56665a]">{generator.sourceComment.content}</p></div>}
            <label className={labelClass}>Post content<textarea className={`${fieldClass} min-h-36 resize-y py-3 leading-relaxed`} value={generator.form.post} onChange={(event) => generator.updateForm({ post: event.target.value })} placeholder="Paste the post you want to respond to" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Expertise<input className={`${fieldClass} h-10`} value={generator.form.expertise} onChange={(event) => generator.updateForm({ expertise: event.target.value })} /></label>
              <label className={labelClass}>Tone<select className={`${fieldClass} h-10`} value={generator.form.tone} onChange={(event) => generator.updateForm({ tone: event.target.value })}><option>Thoughtful and direct</option><option>Warm and conversational</option><option>Analytical and precise</option><option>Confident and concise</option></select></label>
            </div>
            <div>
              <span className={labelClass}>Length</span>
              <div className="mt-1.5 grid grid-cols-3 rounded-md border border-[#d5dfd7] bg-[#f7f9f7] p-1" role="group" aria-label="Comment length">
                {generationLengths.map((length) => <button key={length} type="button" onClick={() => generator.updateForm({ length })} aria-pressed={generator.form.length === length} className={`rounded px-2 py-2 text-xs capitalize ${generator.form.length === length ? 'bg-white font-semibold text-[#244d37] shadow-sm' : 'text-[#728077]'}`}>{length}</button>)}
              </div>
            </div>
            <label className={labelClass}>Strategy<select className={`${fieldClass} h-10`} value={generator.form.strategy} onChange={(event) => generator.updateForm({ strategy: event.target.value as typeof generator.form.strategy })}>{generationStrategies.map((strategy) => <option key={strategy.value} value={strategy.value}>{strategy.label}</option>)}</select>{generationStrategies.find((item) => item.value === generator.form.strategy)?.description && <span className="mt-1.5 block font-normal text-[#7b887f]">{generationStrategies.find((item) => item.value === generator.form.strategy)?.description}</span>}</label>
            <label className={labelClass}>Additional context <span className="font-normal text-[#89958c]">(optional)</span><textarea className={`${fieldClass} min-h-20 resize-y py-2.5`} value={generator.form.additionalContext ?? ''} onChange={(event) => generator.updateForm({ additionalContext: event.target.value })} placeholder="A point of view, example, or detail you want included" /></label>
            {generator.error && <p role="alert" className="rounded-md bg-[#fbefeb] px-3 py-2 text-xs text-[#934d3e]">{generator.error}</p>}
            <button type="button" onClick={() => void generator.generate()} disabled={generator.isGenerating} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#173b2d] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#24533e] disabled:cursor-wait disabled:opacity-70">
              {generator.isGenerating ? <LoaderCircle className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{generator.isGenerating ? 'Thinking through the context…' : generator.variation ? 'Regenerate options' : 'Generate 3 options'}
            </button>
          </div>
        </section>

        <section className="space-y-4" aria-label="Generated comment options" aria-busy={generator.isGenerating}>
          <div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-[#293c30]">Comment options</h2><p className="mt-1 text-xs text-[#78867d]">Review for accuracy and make it sound like you.</p></div>{generator.variation > 0 && <span className="text-[11px] text-[#87938a]">Set {generator.variation} · Demo output</span>}</div>

          {generator.isGenerating ? (
            <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-[#cbd7cd] bg-white"><div className="text-center"><LoaderCircle className="mx-auto size-7 animate-spin text-[#49775a]" /><p className="mt-3 text-sm font-medium text-[#405348]">Connecting your experience to the discussion</p><p className="mt-1 text-xs text-[#849087]">Comparing angles and strategy…</p></div></div>
          ) : generator.options.length ? (
            <div className="grid gap-3">
              {generator.options.map((option, index) => (
                <motion.article key={`${option.id}-${generator.variation}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className={`rounded-lg border bg-white p-4 md:p-5 ${generator.selectedOptionId === option.id ? 'border-[#789b81] ring-1 ring-[#789b81]/20' : 'border-[#dce4dd]'}`}>
                  <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-full bg-[#eef3ee] text-[10px] font-bold text-[#3d694d]">{index + 1}</span><h3 className="text-xs font-semibold text-[#3c5142]">{option.label}</h3></div><button type="button" onClick={() => void copyOption(option.id)} aria-label={`Copy ${option.label}`} className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-xs text-[#63736a] hover:bg-[#f2f6f2]">{copiedId === option.id ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}{copiedId === option.id ? 'Copied' : 'Copy'}</button></div>
                  <button type="button" onClick={() => generator.selectOption(option.id)} className="mt-3 block w-full text-left" aria-pressed={generator.selectedOptionId === option.id}><p className="text-sm leading-relaxed text-[#35483b]">{option.content}</p></button>
                  <p className="mt-3 border-t border-[#edf0ed] pt-3 text-[11px] leading-relaxed text-[#77847b]">{option.rationale}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {refinementActions.map((action) => <button key={action.mode} type="button" onClick={() => void generator.refine(option.id, action.mode)} disabled={generator.refiningId === option.id} className="rounded border border-[#e0e7e1] px-2 py-1.5 text-[10px] font-medium text-[#617267] hover:border-[#b8cbbd] hover:bg-[#f7f9f7] disabled:opacity-60">{generator.refiningId === option.id && action.mode === 'improve' ? <WandSparkles className="mr-1 inline size-3" /> : null}{action.label}</button>)}
                    {generator.refiningId === option.id && <span className="inline-flex items-center gap-1 px-1 text-[10px] text-[#728077]"><LoaderCircle className="size-3 animate-spin" />Refining</span>}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-[#cbd7cd] bg-white p-8 text-center"><div><span className="mx-auto grid size-11 place-items-center rounded-full bg-[#edf3ee] text-[#447354]"><MessageSquareText className="size-5" /></span><h3 className="mt-4 text-sm font-semibold text-[#34483a]">Start with the conversation</h3><p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[#78867d]">Add a post or choose one from the opportunity feed. Your options will be grounded in its specific idea and your profile.</p><Link href="/opportunities" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#326245]">Browse opportunities <RotateCw className="size-3.5" /></Link></div></div>
          )}
        </section>
      </div>
    </main>
  );
}