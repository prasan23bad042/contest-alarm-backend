import { syncPlatform } from './platformSyncEngine';

export const syncCodeforcesContests = async () => {
  return syncPlatform('codeforces');
};