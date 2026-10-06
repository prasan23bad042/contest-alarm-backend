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
const codeforces_1 = require("../sync/codeforces");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Connecting to Codeforces API...');
        const contests = yield (0, codeforces_1.fetchCodeforcesContests)();
        console.log('\Codeforces API connected ✓\n');
        console.log('Upcoming contests:\n');
        contests.forEach((contest, index) => {
            console.log(`${index + 1}. ${contest.name}`);
            console.log(`   ID: ${contest.externalId}`);
            console.log(`   Start: ${contest.startTime}`);
            console.log(`   Duration: ${contest.durationMinutes} minutes`);
            console.log(`   URL: ${contest.url}\n`);
        });
    }
    catch (error) {
        console.error('Failed to test Codeforces integration:', error.message);
    }
});
run();
