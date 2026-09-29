import type { AccountConnection } from '../types/account';

const DEMO_ACCOUNTS: AccountConnection[] = [
  { id: 'linkedin-personal', platform: 'LinkedIn', handle: 'morgan-chen', status: 'Connected', lastSynced: 'Today, 9:42 AM', syncState: 'Idle', demo: true },
  { id: 'x-personal', platform: 'X', handle: '@morganbuilds', status: 'Disconnected', lastSynced: 'Not synced', syncState: 'Idle', demo: true },
];

export function getDemoAccounts(): AccountConnection[] {
  return DEMO_ACCOUNTS.map((account) => ({ ...account }));
}