'use client';

import { useState } from 'react';
import { Check, CircleHelp, UserRound } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { useProfile } from '../hooks/use-profile';

const inputClass = 'mt-1.5 h-10 w-full rounded-md border border-[#d5dfd7] bg-white px-3 text-sm text-[#26382d] outline-none focus:border-[#4f8061] focus:ring-2 focus:ring-[#4f8061]/15';
const labelClass = 'text-xs font-semibold text-[#4f6055]';

function csv(value: string[]) {
  return value.join(', ');
}

export function ProfileSettings() {
  const { profile, isLoaded, updateProfile, persistProfile } = useProfile();
  const [saved, setSaved] = useState(false);

  function save() {
    persistProfile();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="space-y-6">
      <PageHeader eyebrow="Personalization · Demo profile" title="Expertise profile" description="Give the recommendation engine useful context about your experience, interests, and writing voice." />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)]">
        <section className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-[#edf0ed] pb-5">
            <span className="grid size-10 place-items-center rounded-full bg-[#e5eee7] text-[#376347]"><UserRound className="size-5" /></span>
            <div><h2 className="text-sm font-semibold text-[#283a2f]">Professional context</h2><p className="mt-1 text-xs text-[#78867d]">Used only to personalize demo recommendations in this browser.</p></div>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); save(); }} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <label className={labelClass}>Name<input className={inputClass} value={profile.name} onChange={(event) => updateProfile({ name: event.target.value })} /></label>
            <label className={labelClass}>Role<input className={inputClass} value={profile.role} onChange={(event) => updateProfile({ role: event.target.value })} /></label>
            <label className={labelClass}>Industry<input className={inputClass} value={profile.industry} onChange={(event) => updateProfile({ industry: event.target.value })} /></label>
            <label className={labelClass}>Experience<input className={inputClass} value={profile.experience} onChange={(event) => updateProfile({ experience: event.target.value })} /></label>
            <label className={labelClass}>Skills<input className={inputClass} value={csv(profile.skills)} onChange={(event) => updateProfile({ skills: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
            <label className={labelClass}>Topics<input className={inputClass} value={csv(profile.topics)} onChange={(event) => updateProfile({ topics: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
            <label className={labelClass}>Interests<input className={inputClass} value={csv(profile.interests)} onChange={(event) => updateProfile({ interests: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
            <label className={labelClass}>Tone
              <select className={inputClass} value={profile.tone} onChange={(event) => updateProfile({ tone: event.target.value })}>
                <option>Thoughtful and direct</option><option>Warm and conversational</option><option>Analytical and precise</option><option>Confident and concise</option>
              </select>
            </label>
            <label className={labelClass}>Writing style<input className={inputClass} value={profile.writingStyle} onChange={(event) => updateProfile({ writingStyle: event.target.value })} /></label>
            <label className={labelClass}>Preferred comment length
              <select className={inputClass} value={profile.preferredLength} onChange={(event) => updateProfile({ preferredLength: event.target.value as typeof profile.preferredLength })}>
                <option>Short</option><option>Balanced</option><option>Detailed</option>
              </select>
            </label>
            <div className="flex items-center justify-between gap-3 pt-2 sm:col-span-2">
              <p className="flex items-center gap-1.5 text-xs text-[#76847a]"><CircleHelp className="size-3.5" />{isLoaded ? 'Saved locally in this browser' : 'Loading saved profile'}</p>
              <button type="submit" className="inline-flex h-10 items-center gap-2 rounded-md bg-[#173b2d] px-4 text-xs font-semibold text-white hover:bg-[#24533e]">{saved && <Check className="size-4" />}{saved ? 'Saved' : 'Save profile'}</button>
            </div>
          </form>
        </section>

        <aside className="rounded-lg border border-[#dce4dd] bg-[#eaf0e9] p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#65796a]">Personalization preview</p>
          <h2 className="mt-3 text-lg font-semibold leading-snug text-[#20372a]">Suggestions shaped by your experience</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#55685a]">Your {profile.preferredLength.toLowerCase()} comments will use a {profile.tone.toLowerCase()} voice, drawing on {profile.skills.slice(0, 2).join(' and ') || 'your expertise'}.</p>
          <div className="mt-5 border-t border-[#d1ddd2] pt-4"><p className="text-xs font-semibold text-[#435b49]">Topics in focus</p><div className="mt-2 flex flex-wrap gap-2">{profile.topics.slice(0, 4).map((topic) => <span key={topic} className="rounded-full border border-[#c7d6c9] bg-white/70 px-2.5 py-1 text-[11px] text-[#496250]">{topic}</span>)}</div></div>
        </aside>
      </div>
    </main>
  );
}