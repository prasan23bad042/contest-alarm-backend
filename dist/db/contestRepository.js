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
exports.getContestByExternalId = exports.getUpcomingContests = exports.upsertContest = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const upsertContest = (contest) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.contest.upsert({
        where: {
            platform_externalId: {
                platform: contest.platform,
                externalId: contest.externalId,
            },
        },
        update: {
            name: contest.name,
            startTime: new Date(contest.startTime),
            durationMinutes: contest.durationMinutes,
            url: contest.url,
            status: contest.status,
            lastSyncedAt: new Date(),
        },
        create: {
            platform: contest.platform,
            externalId: contest.externalId,
            name: contest.name,
            startTime: new Date(contest.startTime),
            durationMinutes: contest.durationMinutes,
            url: contest.url,
            status: contest.status,
        },
    });
});
exports.upsertContest = upsertContest;
const getUpcomingContests = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.contest.findMany({
        where: {
            status: {
                in: ['BEFORE'],
            },
            startTime: {
                gte: new Date(),
            },
        },
        orderBy: {
            startTime: 'asc',
        },
    });
});
exports.getUpcomingContests = getUpcomingContests;
const getContestByExternalId = (platform, externalId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.contest.findUnique({
        where: {
            platform_externalId: {
                platform,
                externalId,
            },
        },
    });
});
exports.getContestByExternalId = getContestByExternalId;
