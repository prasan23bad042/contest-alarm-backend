"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformRegistry = void 0;
class PlatformRegistry {
    constructor() {
        this.adapters = new Map();
    }
    register(adapter) {
        this.adapters.set(adapter.platform, adapter);
    }
    get(platform) {
        return this.adapters.get(platform);
    }
    getAll() {
        return Array.from(this.adapters.values());
    }
    has(platform) {
        return this.adapters.has(platform);
    }
}
exports.PlatformRegistry = PlatformRegistry;
