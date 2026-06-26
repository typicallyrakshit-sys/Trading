"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompetition = void 0;
const database_1 = require("../config/database");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
exports.getCompetition = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const competition = await database_1.prisma.competition.findFirst({
        orderBy: { createdAt: 'desc' },
    });
    if (!competition)
        throw ApiError_1.ApiError.notFound('No active competition found');
    ApiResponse_1.ApiResponse.ok(res, 'Competition retrieved', competition);
});
//# sourceMappingURL=competition.controller.js.map