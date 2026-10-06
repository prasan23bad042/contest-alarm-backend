"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const codeforces_1 = require("../codeforces");
jest.mock('axios');
const mockedAxios = axios_1.default;
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
        const contests = await (0, codeforces_1.fetchCodeforcesContests)();
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
        await expect((0, codeforces_1.fetchCodeforcesContests)()).rejects.toThrow('Codeforces API returned status: FAILED - Rate limited');
    });
    it('should throw error on network failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        await expect((0, codeforces_1.fetchCodeforcesContests)()).rejects.toThrow('Failed to fetch Codeforces contests: Network Error');
    });
});
//# sourceMappingURL=codeforces.test.js.map