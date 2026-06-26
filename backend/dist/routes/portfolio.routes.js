"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// GET /api/v1/portfolio
router.get('/', auth_middleware_1.authenticate, portfolio_controller_1.getPortfolio);
// GET /api/v1/portfolio/summary
router.get('/summary', auth_middleware_1.authenticate, portfolio_controller_1.getPortfolioSummary);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map