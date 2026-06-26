"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
// GET /api/v1/admin/stats
router.get('/stats', auth_middleware_1.authenticate, admin_middleware_1.requireAdmin, admin_controller_1.getAdminStats);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map