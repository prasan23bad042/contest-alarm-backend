import axios from 'axios';
import {
  NormalizedContest,
} from './types';
import { ContestPlatformAdapter } from './platformAdapter';

const CODECHEF_API_URL =
  'https://www.codechef.com/api/list/contests/all';

interface CodeChefContest {
  contest_id: string;
  contest_code: string;
  contest_name: string;

  contest_start_date: string;
  contest_end_date: string;

  contest_start_date_iso: string;
  contest_end_date_iso: string;

  contest_duration: string;
  distinct_users?: number;
}

interface CodeChefApiResponse {
  status: string;
  message: string;

  present_contests: CodeChefContest[];
  future_contests: CodeChefContest[];
  practice_contests: CodeChefContest[];
  past_contests: CodeChefContest[];
  skill_tests: CodeChefContest[];
  banners?: unknown[];
}

export class CodeChefAdapter
  implements ContestPlatformAdapter {

  readonly platform = 'codechef';

  async fetchContests(): Promise<NormalizedContest[]> {

    try {

      const response =
        await axios.get<CodeChefApiResponse>(
          CODECHEF_API_URL,
          {
            timeout: 10000,
            headers: {
              'User-Agent':
                'ContestAlarm/1.0',
              'Accept':
                'application/json',
            },
          }
        );

      const data =
        response.data;

      if (
        data.status !== 'success' &&
        data.status !== 'OK'
      ) {

        throw new Error(
          `CodeChef API returned status: ` +
          `${data.status} - ` +
          `${data.message || 'Unknown error'}`
        );
      }

      const futureContests =
        data.future_contests || [];

      console.log(
        `[CodeChef] Found ` +
        `${futureContests.length} future contests`
      );

      return futureContests.map(
        (contest) =>
          this.normalizeContest(
            contest
          )
      );

    } catch (error: any) {

      console.error(
        '[CodeChef Sync Error]:',
        error.message
      );

      throw new Error(
        `Failed to fetch CodeChef contests: ` +
        `${error.message}`
      );
    }
  }

  private normalizeContest(
    contest: CodeChefContest
  ): NormalizedContest {

    const startTime =
      new Date(
        contest.contest_start_date_iso
      );

    const endTime =
      new Date(
        contest.contest_end_date_iso
      );

    if (
      Number.isNaN(
        startTime.getTime()
      )
    ) {
      throw new Error(
        `Invalid CodeChef start time for ` +
        `${contest.contest_code}`
      );
    }

    if (
      Number.isNaN(
        endTime.getTime()
      )
    ) {
      throw new Error(
        `Invalid CodeChef end time for ` +
        `${contest.contest_code}`
      );
    }

    const durationMinutes =
      Math.round(
        (
          endTime.getTime() -
          startTime.getTime()
        ) / 60000
      );

    return {
      platform: 'codechef',

      externalId:
        contest.contest_id,

      name:
        contest.contest_name,

      startTime:
        startTime.toISOString(),

      durationMinutes,

      url:
        `https://www.codechef.com/${contest.contest_code}`,

      status:
        'BEFORE',
    };
  }
}

export const fetchCodeChefContests =
  async (): Promise<NormalizedContest[]> => {

    const adapter =
      new CodeChefAdapter();

    return adapter.fetchContests();
  };