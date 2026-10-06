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
exports.fetchCodeforcesContests = exports.CodeforcesAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
const contestNormalizer_1 = require("./contestNormalizer");
const CODEFORCES_API_URL = 'https://codeforces.com/api/contest.list';
class CodeforcesAdapter {
    constructor() {
        this.platform = 'codeforces';
    }
    fetchContests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(CODEFORCES_API_URL, {
                    timeout: 10000,
                });
                const data = response.data;
                if (data.status !== 'OK' ||
                    !data.result) {
                    throw new Error(`Codeforces API returned status: ` +
                        `${data.status} - ` +
                        `${data.comment || 'Unknown error'}`);
                }
                // Keep only upcoming contests
                const upcomingContests = data.result.filter((contest) => contest.phase === 'BEFORE');
                // Convert to common contest model
                const normalized = upcomingContests.map(contestNormalizer_1.normalizeCodeforcesContest);
                return normalized;
            }
            catch (error) {
                console.error('[Codeforces Sync Error]:', error.message);
                throw new Error(`Failed to fetch Codeforces contests: ` +
                    `${error.message}`);
            }
        });
    }
}
exports.CodeforcesAdapter = CodeforcesAdapter;
// --------------------------------------------------
// Backward-compatible helper
// --------------------------------------------------
const fetchCodeforcesContests = () => __awaiter(void 0, void 0, void 0, function* () {
    const adapter = new CodeforcesAdapter();
    return adapter.fetchContests();
});
exports.fetchCodeforcesContests = fetchCodeforcesContests;
