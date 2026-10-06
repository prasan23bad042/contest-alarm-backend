import { normalizeCodeforcesContest } from '../contestNormalizer';
import { CodeforcesContestResponse } from '../types';

describe('contestNormalizer', () => {
  it('should normalize a valid Codeforces contest', () => {
    const rawContest: CodeforcesContestResponse = {
      id: 1234,
      name: 'Codeforces Round 1234',
      type: 'CF',
      phase: 'BEFORE',
      frozen: false,
      durationSeconds: 7200,
      startTimeSeconds: 1700000000,
    };

    const normalized = normalizeCodeforcesContest(rawContest);

    expect(normalized).toEqual({
      platform: 'codeforces',
      externalId: '1234',
      name: 'Codeforces Round 1234',
      startTime: new Date(1700000000 * 1000).toISOString(),
      durationMinutes: 120,
      url: 'https://codeforces.com/contest/1234',
      status: 'BEFORE',
    });
  });

  it('should handle missing duration gracefully', () => {
    const rawContest = {
      id: 5678,
      name: 'Unknown Duration Contest',
      type: 'CF',
      phase: 'BEFORE',
      frozen: false,
      durationSeconds: 0,
      startTimeSeconds: 1700000000,
    };

    const normalized = normalizeCodeforcesContest(rawContest);
    expect(normalized.durationMinutes).toBe(0);
  });
});
