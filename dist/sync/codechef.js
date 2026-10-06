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
exports.fetchCodeChefContests = exports.CodeChefAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
const CODECHEF_API_URL = 'https://www.codechef.com/api/list/contests/all';
class CodeChefAdapter {
    constructor() {
        this.platform = 'codechef';
    }
    fetchContests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(CODECHEF_API_URL, {
                    timeout: 10000,
                    headers: {
                        'User-Agent': 'ContestAlarm/1.0',
                        'Accept': 'application/json',
                    },
                });
                const data = response.data;
                if (data.status !== 'success' &&
                    data.status !== 'OK') {
                    throw new Error(`CodeChef API returned status: ` +
                        `${data.status} - ` +
                        `${data.message || 'Unknown error'}`);
                }
                const futureContests = data.future_contests || [];
                console.log(`[CodeChef] Found ` +
                    `${futureContests.length} future contests`);
                return futureContests.map((contest) => this.normalizeContest(contest));
            }
            catch (error) {
                console.error('[CodeChef Sync Error]:', error.message);
                throw new Error(`Failed to fetch CodeChef contests: ` +
                    `${error.message}`);
            }
        });
    }
    normalizeContest(contest) {
        const startTime = new Date(contest.contest_start_date_iso);
        const endTime = new Date(contest.contest_end_date_iso);
        if (Number.isNaN(startTime.getTime())) {
            throw new Error(`Invalid CodeChef start time for ` +
                `${contest.contest_code}`);
        }
        if (Number.isNaN(endTime.getTime())) {
            throw new Error(`Invalid CodeChef end time for ` +
                `${contest.contest_code}`);
        }
        const durationMinutes = Math.round((endTime.getTime() -
            startTime.getTime()) / 60000);
        return {
            platform: 'codechef',
            externalId: contest.contest_id,
            name: contest.contest_name,
            startTime: startTime.toISOString(),
            durationMinutes,
            url: `https://www.codechef.com/${contest.contest_code}`,
            status: 'BEFORE',
        };
    }
}
exports.CodeChefAdapter = CodeChefAdapter;
const fetchCodeChefContests = () => __awaiter(void 0, void 0, void 0, function* () {
    const adapter = new CodeChefAdapter();
    return adapter.fetchContests();
});
exports.fetchCodeChefContests = fetchCodeChefContests;
