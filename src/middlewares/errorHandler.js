"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = require("express");
const errorHandler = (err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map