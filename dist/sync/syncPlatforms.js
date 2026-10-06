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
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncPlatforms = void 0;
const platformSyncEngine_1 = require("./platformSyncEngine");
const syncPlatforms = (platforms) => __awaiter(void 0, void 0, void 0, function* () {
    const uniquePlatforms = Array.from(new Set(platforms
        .map((platform) => platform.trim().toLowerCase())
        .filter(Boolean)));
    const results = [];
    for (const platform of uniquePlatforms) {
        const result = yield (0, platformSyncEngine_1.syncPlatform)(platform);
        results.push(result);
    }
    const failed = results.filter((result) => !result.success);
    return {
        success: failed.length === 0,
        results,
    };
});
exports.syncPlatforms = syncPlatforms;
