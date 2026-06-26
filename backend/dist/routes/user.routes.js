"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// GET /api/v1/users/profile
router.get('/profile', auth_middleware_1.authenticate, user_controller_1.getProfile);
// GET /api/v1/users — admin only (auth placeholder)
router.get('/', auth_middleware_1.authenticate, user_controller_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map