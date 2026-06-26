"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.getUserOrders = exports.placeOrder = void 0;
const order_service_1 = require("../services/order.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.placeOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const orderData = req.body;
    const order = await order_service_1.orderService.createOrder(userId, orderData);
    ApiResponse_1.ApiResponse.created(res, 'Order placed successfully', order);
});
exports.getUserOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await order_service_1.orderService.getUserOrders(userId, {}, page, limit);
    ApiResponse_1.ApiResponse.ok(res, 'Orders retrieved', result.data, {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
    });
});
exports.cancelOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const { id } = req.params;
    const order = await order_service_1.orderService.cancelOrder(id, userId);
    ApiResponse_1.ApiResponse.ok(res, 'Order cancelled', order);
});
//# sourceMappingURL=order.controller.js.map