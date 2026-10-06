"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const getEnv = () => {
    return {
        PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
        DATABASE_URL: process.env.DATABASE_URL || '',
        NODE_ENV: process.env.NODE_ENV || 'development',
    };
};
exports.env = getEnv();
// Basic validation
if (!exports.env.DATABASE_URL) {
    console.warn('[Warning]: DATABASE_URL is not set in the environment variables.');
}
//# sourceMappingURL=env.js.map