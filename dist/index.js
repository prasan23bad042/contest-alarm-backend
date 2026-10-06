"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const health_1 = __importDefault(require("./routes/health"));
const contests_1 = __importDefault(require("./routes/contests"));
const sync_1 = __importDefault(require("./routes/sync"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/health', health_1.default);
app.use('/api/contests', contests_1.default);
app.use('/api/sync', sync_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
const PORT = env_1.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
