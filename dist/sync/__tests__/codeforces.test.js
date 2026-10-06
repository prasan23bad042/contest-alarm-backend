"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('should successfully fetch and filter upcoming contests', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const contests = yield (0, codeforces_1.fetchCodeforcesContests)();
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(contests).toHaveLength(1);
        expect(contests[0].externalId).toBe('100');
        expect(contests[0].name).toBe('Upcoming Contest');
        expect(contests[0].status).toBe('BEFORE');
    }));
    it('should throw error if API status is not OK', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.get.mockResolvedValueOnce({
            data: { status: 'FAILED', comment: 'Rate limited' },
        });
        yield expect((0, codeforces_1.fetchCodeforcesContests)()).rejects.toThrow('Codeforces API returned status: FAILED - Rate limited');
    }));
    it('should throw error on network failure', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        yield expect((0, codeforces_1.fetchCodeforcesContests)()).rejects.toThrow('Failed to fetch Codeforces contests: Network Error');
    }));
});
