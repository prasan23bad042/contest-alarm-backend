"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlatformRegistry = void 0;
const codeforces_1 = require("./codeforces");
const codechef_1 = require("./codechef");
const platformRegistry_1 = require("./platformRegistry");
const createPlatformRegistry = () => {
    const registry = new platformRegistry_1.PlatformRegistry();
    registry.register(new codeforces_1.CodeforcesAdapter());
    registry.register(new codechef_1.CodeChefAdapter());
    return registry;
};
exports.createPlatformRegistry = createPlatformRegistry;
