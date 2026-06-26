"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
const ApiResponse_1 = require("../utils/ApiResponse");
function notFoundHandler(req, res) {
    return ApiResponse_1.ApiResponse.error(res, 404, `Cannot ${req.method} ${req.originalUrl}`);
}
//# sourceMappingURL=notFound.middleware.js.map