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
const express_1 = require("express");
const platformSyncEngine_1 = require("../sync/platformSyncEngine");
const syncPlatforms_1 = require("../sync/syncPlatforms");
const router = (0, express_1.Router)();
// Sync multiple platforms
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const platforms = (_a = req.body) === null || _a === void 0 ? void 0 : _a.platforms;
        if (!Array.isArray(platforms) ||
            platforms.length === 0) {
            res.status(400).json({
                success: false,
                message: 'platforms must be a non-empty array',
            });
            return;
        }
        const result = yield (0, syncPlatforms_1.syncPlatforms)(platforms);
        res.status(result.success ? 200 : 500).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                'Sync failed',
        });
    }
}));
// Backward-compatible single-platform route
router.post('/:platform', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = String(req.params.platform)
            .trim()
            .toLowerCase();
        if (!platform) {
            res.status(400).json({
                success: false,
                message: 'Platform is required',
            });
            return;
        }
        const result = yield (0, platformSyncEngine_1.syncPlatform)(platform);
        res.status(result.success ? 200 : 500).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                'Sync failed',
        });
    }
}));
exports.default = router;
