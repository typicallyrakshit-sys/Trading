"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const router = (0, express_1.Router)();
// GET /api/v1/leaderboard — public
router.get('/', leaderboard_controller_1.getLeaderboard);
exports.default = router;
//# sourceMappingURL=leaderboard.routes.js.map