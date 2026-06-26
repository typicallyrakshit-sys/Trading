"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const requestValidator_middleware_1 = require("../middlewares/requestValidator.middleware");
const order_validator_1 = require("../validators/order.validator");
const rateLimiter_middleware_1 = require("../middlewares/rateLimiter.middleware");
const router = (0, express_1.Router)();
// POST /api/v1/orders
router.post('/', auth_middleware_1.authenticate, rateLimiter_middleware_1.orderRateLimiter, (0, requestValidator_middleware_1.validate)(order_validator_1.createOrderSchema), order_controller_1.placeOrder);
// GET /api/v1/orders
router.get('/', auth_middleware_1.authenticate, order_controller_1.getUserOrders);
// DELETE /api/v1/orders/:id
router.delete('/:id', auth_middleware_1.authenticate, order_controller_1.cancelOrder);
exports.default = router;
//# sourceMappingURL=order.routes.js.map