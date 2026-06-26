"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const order_repository_1 = require("../repositories/order.repository");
const user_repository_1 = require("../repositories/user.repository");
const ApiError_1 = require("../utils/ApiError");
class OrderService {
    async getOrderById(id) {
        const order = await order_repository_1.orderRepository.findById(id);
        if (!order)
            throw ApiError_1.ApiError.notFound(`Order '${id}' not found`);
        return order;
    }
    async getUserOrders(userId, filters = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const { orders, total } = await order_repository_1.orderRepository.findByUserId(userId, filters, skip, limit);
        const totalPages = Math.ceil(total / limit);
        return {
            data: orders,
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }
    async createOrder(userId, data) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user)
            throw ApiError_1.ApiError.notFound('User not found');
        // Phase 3: Validate balance, execute trade, update portfolio
        // For now: record the order as PENDING
        const order = await order_repository_1.orderRepository.create(userId, data);
        return order;
    }
    async cancelOrder(orderId, userId) {
        const order = await this.getOrderById(orderId);
        if (order.userId !== userId)
            throw ApiError_1.ApiError.forbidden('Cannot cancel another user\'s order');
        if (order.status !== 'PENDING')
            throw ApiError_1.ApiError.badRequest('Only PENDING orders can be cancelled');
        return order_repository_1.orderRepository.updateStatus(orderId, 'CANCELLED');
    }
    async getTotalOrderCount() {
        return order_repository_1.orderRepository.countAll();
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map