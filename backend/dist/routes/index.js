"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controller_1 = require("../controllers/health.controller");
const user_routes_1 = __importDefault(require("./user.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const portfolio_routes_1 = __importDefault(require("./portfolio.routes"));
const leaderboard_routes_1 = __importDefault(require("./leaderboard.routes"));
const competition_routes_1 = __importDefault(require("./competition.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const router = (0, express_1.Router)();
// Health check — no auth required
router.get('/health', health_controller_1.healthCheck);
// Feature routes
router.use('/users', user_routes_1.default);
router.use('/orders', order_routes_1.default);
router.use('/portfolio', portfolio_routes_1.default);
router.use('/leaderboard', leaderboard_routes_1.default);
router.use('/competition', competition_routes_1.default);
router.use('/admin', admin_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map