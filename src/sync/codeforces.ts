import axios from 'axios';
import {
  CodeforcesApiResponse,
  NormalizedContest,
} from './types';
import { normalizeCodeforcesContest } from './contestNormalizer';
import { ContestPlatformAdapter } from './platformAdapter';

const CODEFORCES_API_URL =
  'https://codeforces.com/api/contest.list';

export class CodeforcesAdapter
  implements ContestPlatformAdapter {

  readonly platform = 'codeforces';

  async fetchContests(): Promise<NormalizedContest[]> {

    try {

      const response =
        await axios.get<CodeforcesApiResponse>(
          CODEFORCES_API_URL,
          {
            timeout: 10000,
          }
        );

      const data =
        response.data;

      if (
        data.status !== 'OK' ||
        !data.result
      ) {

        throw new Error(
          `Codeforces API returned status: ` +
          `${data.status} - ` +
          `${data.comment || 'Unknown error'}`
        );
      }

      // Keep only upcoming contests
      const upcomingContests =
        data.result.filter(
          (contest) =>
            contest.phase === 'BEFORE'
        );

      // Convert to common contest model
      const normalized =
        upcomingContests.map(
          normalizeCodeforcesContest
        );

      return normalized;

    } catch (error: any) {

      console.error(
        '[Codeforces Sync Error]:',
        error.message
      );

      throw new Error(
        `Failed to fetch Codeforces contests: ` +
        `${error.message}`
      );
    }
  }
}

// --------------------------------------------------
// Backward-compatible helper
// --------------------------------------------------

export const fetchCodeforcesContests =
  async (): Promise<NormalizedContest[]> => {

    const adapter =
      new CodeforcesAdapter();

    return adapter.fetchContests();
  };