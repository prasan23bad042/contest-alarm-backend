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
const contestRepository_1 = require("../db/contestRepository");
const router = (0, express_1.Router)();
router.get('/upcoming', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upcomingContests = yield (0, contestRepository_1.getUpcomingContests)();
        res.status(200).json({
            success: true,
            count: upcomingContests.length,
            contests: upcomingContests,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch contests from database',
        });
    }
}));
exports.default = router;
