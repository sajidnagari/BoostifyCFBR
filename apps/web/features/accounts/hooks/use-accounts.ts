'use client';

import { useState } from 'react';
import { getDemoAccounts } from '../services/accounts.service';
import type { AccountConnection } from '../types/account';

export function useAccounts() {
  const [accounts, setAccounts] = useState<AccountConnection[]>(getDemoAccounts);

  function connect(id: string) {
    setAccounts((current) => current.map((account) => account.id === id ? { ...account, status: 'Connected', lastSynced: 'Not synced' } : account));
  }

  function disconnect(id: string) {
    setAccounts((current) => current.map((account) => account.id === id ? { ...account, status: 'Disconnected', syncState: 'Idle' } : account));
  }

  function sync(id: string) {
    setAccounts((current) => current.map((account) => account.id === id ? { ...account, syncState: 'Syncing' } : account));
    window.setTimeout(() => setAccounts((current) => current.map((account) => account.id === id ? { ...account, syncState: 'Complete', lastSynced: 'Just now' } : account)), 800);
  }

  return { accounts, connect, disconnect, sync };
}