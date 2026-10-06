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
exports.syncPlatform = void 0;
const platformRegistryFactory_1 = require("./platformRegistryFactory");
const contestRepository_1 = require("../db/contestRepository");
const prisma_1 = __importDefault(require("../db/prisma"));
const syncPlatform = (platform) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registry = (0, platformRegistryFactory_1.createPlatformRegistry)();
        const adapter = registry.get(platform);
        if (!adapter) {
            throw new Error(`Platform adapter not registered: ${platform}`);
        }
        const contests = yield adapter.fetchContests();
        let created = 0;
        let updated = 0;
        let unchanged = 0;
        for (const contest of contests) {
            const existing = yield prisma_1.default.contest.findUnique({
                where: {
                    platform_externalId: {
                        platform: contest.platform,
                        externalId: contest.externalId,
                    },
                },
            });
            yield (0, contestRepository_1.upsertContest)(contest);
            if (!existing) {
                created++;
                continue;
            }
            const timeChanged = existing.startTime.getTime() !==
                new Date(contest.startTime).getTime();
            const durationChanged = existing.durationMinutes !==
                contest.durationMinutes;
            const statusChanged = existing.status !==
                contest.status;
            const nameChanged = existing.name !==
                contest.name;
            const urlChanged = existing.url !==
                contest.url;
            if (timeChanged ||
                durationChanged ||
                statusChanged ||
                nameChanged ||
                urlChanged) {
                updated++;
            }
            else {
                unchanged++;
            }
        }
        return {
            success: true,
            platform,
            total: contests.length,
            created,
            updated,
            unchanged,
        };
    }
    catch (error) {
        return {
            success: false,
            platform,
            message: error.message ||
                `Failed to sync ${platform}`,
        };
    }
});
exports.syncPlatform = syncPlatform;
