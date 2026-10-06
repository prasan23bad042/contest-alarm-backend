import axios from 'axios';
import { fetchCodeforcesContests } from '../codeforces';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchCodeforcesContests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully fetch and filter upcoming contests', async () => {
    const mockData = {
      status: 'OK',
      result: [
        {
          id: 100,
          name: 'Upcoming Contest',
          type: 'CF',
          phase: 'BEFORE',
          frozen: false,
          durationSeconds: 7200,
          startTimeSeconds: 1800000000,
        },
        {
          id: 101,
          name: 'Finished Contest',
          type: 'CF',
          phase: 'FINISHED',
          frozen: false,
          durationSeconds: 7200,
          startTimeSeconds: 1700000000,
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const contests = await fetchCodeforcesContests();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(contests).toHaveLength(1);
    expect(contests[0].externalId).toBe('100');
    expect(contests[0].name).toBe('Upcoming Contest');
    expect(contests[0].status).toBe('BEFORE');
  });

  it('should throw error if API status is not OK', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { status: 'FAILED', comment: 'Rate limited' },
    });

    await expect(fetchCodeforcesContests()).rejects.toThrow('Codeforces API returned status: FAILED - Rate limited');
  });

  it('should throw error on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchCodeforcesContests()).rejects.toThrow('Failed to fetch Codeforces contests: Network Error');
  });
});
