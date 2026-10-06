"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeforces_1 = require("../sync/codeforces");
const run = async () => {
    try {
        console.log('Connecting to Codeforces API...');
        const contests = await (0, codeforces_1.fetchCodeforcesContests)();
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
};
run();
//# sourceMappingURL=testCodeforces.js.map