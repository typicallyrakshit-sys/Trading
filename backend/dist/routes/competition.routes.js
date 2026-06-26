"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competition_controller_1 = require("../controllers/competition.controller");
const router = (0, express_1.Router)();
// GET /api/v1/competition — public
router.get('/', competition_controller_1.getCompetition);
exports.default = router;
//# sourceMappingURL=competition.routes.js.map