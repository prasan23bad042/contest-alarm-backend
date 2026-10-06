"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = void 0;
const jest_mock_extended_1 = require("jest-mock-extended");
const prisma_1 = __importDefault(require("../prisma"));
jest.mock('../prisma', () => ({
    __esModule: true,
    default: (0, jest_mock_extended_1.mockDeep)(),
}));
exports.prismaMock = prisma_1.default;
