'use client';

import { useState } from 'react';
import { Check, CircleAlert, RefreshCw, ShieldCheck, Unplug } from 'lucide-react';
import { PageHeader } from '@companyio/platform-ui/dist/components/ui/page';
import { useAccounts } from '../hooks/use-accounts';

const platformColor: Record<string, string> = { LinkedIn: 'bg-[#e9eff8] text-[#34577e]', X: 'bg-[#edf0ef] text-[#242d29]' };

export function AccountSettings() {
  const { accounts, connect, disconnect, sync } = useAccounts();
  const [confirmedAction, setConfirmedAction] = useState('');

  function runAction(label: string, action: () => void) {
    action();
    setConfirmedAction(label);
    window.setTimeout(() => setConfirmedAction(''), 2200);
  }

  return (
    <main className="space-y-6">
      <PageHeader eyebrow="Integrations · Demo states" title="Connected accounts" description="Choose which social profiles can contribute posts and performance context to your intelligence workspace." />
      <div className="grid gap-4">
        {accounts.map((account) => (
          <article key={account.id} className="rounded-lg border border-[#dce4dd] bg-white p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <span className={`grid size-12 shrink-0 place-items-center rounded-lg text-sm font-bold ${platformColor[account.platform]}`}>{account.platform === 'LinkedIn' ? 'in' : 'X'}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold text-[#293c30]">{account.platform}</h2><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${account.status === 'Connected' ? 'bg-[#e5f2e8] text-[#286447]' : 'bg-[#f1f2ef] text-[#6d786f]'}`}>{account.status}</span><span className="rounded-full border border-[#dce4dd] px-2 py-0.5 text-[10px] text-[#748178]">DEMO</span></div>
                <p className="mt-1 text-sm text-[#54655a]">{account.status === 'Connected' ? account.handle : 'No account connected'}</p>
                <p className="mt-1 text-xs text-[#7b887f]">Last synced: {account.lastSynced}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {account.status === 'Connected' ? <>
                  <button type="button" onClick={() => runAction(`${account.platform} sync started`, () => sync(account.id))} disabled={account.syncState === 'Syncing'} className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d3ded5] px-3 text-xs font-semibold text-[#4c6052] hover:bg-[#f5f8f5] disabled:opacity-60">{account.syncState === 'Syncing' ? <RefreshCw className="size-3.5 animate-spin" /> : account.syncState === 'Complete' ? <Check className="size-3.5" /> : <RefreshCw className="size-3.5" />}{account.syncState === 'Syncing' ? 'Syncing' : account.syncState === 'Complete' ? 'Synced' : 'Sync now'}</button>
                  <button type="button" onClick={() => runAction(`${account.platform} disconnected in demo`, () => disconnect(account.id))} className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-semibold text-[#8a5745] hover:bg-[#fbf0ec]"><Unplug className="size-3.5" />Disconnect</button>
                </> : <button type="button" onClick={() => runAction(`${account.platform} demo connection added`, () => connect(account.id))} className="h-9 rounded-md bg-[#173b2d] px-3.5 text-xs font-semibold text-white hover:bg-[#24533e]">Connect demo account</button>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="flex items-start gap-3 rounded-lg border border-[#e6dfca] bg-[#fbf7ea] p-4">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#887044]" />
        <div><h2 className="text-xs font-semibold text-[#695936]">Demo integration states</h2><p className="mt-1 text-xs leading-relaxed text-[#807454]">No social platform authorization or publishing occurs here. Connection and sync actions update local demo state only; access tokens are not stored in this app.</p></div>
      </aside>
      {confirmedAction && <p role="status" className="flex items-center gap-2 text-xs text-[#376347]"><CircleAlert className="size-3.5" />{confirmedAction}</p>}
    </main>
  );
}