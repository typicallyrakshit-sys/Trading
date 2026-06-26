"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const leaderboard_service_1 = require("../services/leaderboard.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getLeaderboard = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const entries = await leaderboard_service_1.leaderboardService.getLeaderboard(limit);
    ApiResponse_1.ApiResponse.ok(res, 'Leaderboard retrieved', entries);
});
//# sourceMappingURL=leaderboard.controller.js.map