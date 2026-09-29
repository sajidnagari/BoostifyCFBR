export type AccountConnection = {
  id: string;
  platform: 'LinkedIn' | 'X';
  handle: string;
  status: 'Connected' | 'Disconnected';
  lastSynced: string;
  syncState: 'Idle' | 'Syncing' | 'Complete';
  demo: true;
};