import axios from 'axios';
import {
  NormalizedContest,
} from './types';
import { ContestPlatformAdapter } from './platformAdapter';

const LEETCODE_API_URL =
  'https://leetcode.com/graphql';

interface LeetCodeContest {
  title: string;
  titleSlug: string;
  startTime: number;
  duration: number;
}

interface LeetCodeApiResponse {
  data?: {
    allContests?: LeetCodeContest[];
  };
  errors?: Array<{
    message: string;
  }>;
}

export class LeetCodeAdapter
  implements ContestPlatformAdapter {

  readonly platform = 'leetcode';

  async fetchContests(): Promise<NormalizedContest[]> {

    try {

      const query = `
        query {
          allContests {
            title
            titleSlug
            startTime
            duration
          }
        }
      `;

      const response =
        await axios.post<LeetCodeApiResponse>(
          LEETCODE_API_URL,
          {
            query,
          },
          {
            timeout: 10000,
            headers: {
              'User-Agent':
                'ContestAlarm/1.0',
              'Content-Type':
                'application/json',
              'Accept':
                'application/json',
            },
          }
        );

      const data =
        response.data;

      if (
        data.errors &&
        data.errors.length > 0
      ) {
        throw new Error(
          data.errors
            .map((error) => error.message)
            .join(', ')
        );
      }

      const contests =
        data.data?.allContests || [];

      const now =
        Math.floor(
          Date.now() / 1000
        );

      const futureContests =
        contests.filter(
          (contest) =>
            contest.startTime > now
        );

      console.log(
        `[LeetCode] Found ` +
        `${futureContests.length} future contests`
      );

      return futureContests.map(
        (contest) =>
          this.normalizeContest(contest)
      );

    } catch (error: any) {

      console.error(
        '[LeetCode Sync Error]:',
        error.message
      );

      throw new Error(
        `Failed to fetch LeetCode contests: ` +
        `${error.message}`
      );
    }
  }

  private normalizeContest(
    contest: LeetCodeContest
  ): NormalizedContest {

    const startTime =
      new Date(
        contest.startTime * 1000
      );

    if (
      Number.isNaN(
        startTime.getTime()
      )
    ) {
      throw new Error(
        `Invalid LeetCode start time for ` +
        `${contest.titleSlug}`
      );
    }

    const durationMinutes =
      Math.round(
        contest.duration / 60
      );

    return {
      platform: 'leetcode',

      externalId:
        contest.titleSlug,

      name:
        contest.title,

      startTime:
        startTime.toISOString(),

      durationMinutes,

      url:
        `https://leetcode.com/contest/${contest.titleSlug}/`,

      status:
        'BEFORE',
    };
  }
}

export const fetchLeetCodeContests =
  async (): Promise<NormalizedContest[]> => {

    const adapter =
      new LeetCodeAdapter();

    return adapter.fetchContests();
  };
