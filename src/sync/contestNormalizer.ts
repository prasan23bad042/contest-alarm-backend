import { CodeforcesContestResponse, NormalizedContest } from './types';

export const normalizeCodeforcesContest = (
  contest: CodeforcesContestResponse
): NormalizedContest => {
  // Convert Unix timestamp (seconds) to UTC ISO string
  const startTime = contest.startTimeSeconds
    ? new Date(contest.startTimeSeconds * 1000).toISOString()
    : new Date().toISOString(); // fallback if missing, though API usually provides it

  // Convert duration from seconds to minutes
  const durationMinutes = Math.floor((contest.durationSeconds || 0) / 60);

  return {
    platform: 'codeforces',
    externalId: contest.id.toString(),
    name: contest.name,
    startTime,
    durationMinutes,
    url: `https://codeforces.com/contest/${contest.id}`,
    status: contest.phase,
  };
};
