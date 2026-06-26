"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = exports.OrderRepository = void 0;
const database_1 = require("../config/database");
class OrderRepository {
    async findById(id) {
        return database_1.prisma.order.findUnique({ where: { id } });
    }
    async findByUserId(userId, filters = {}, skip = 0, take = 20) {
        const where = { userId, ...filters };
        const [orders, total] = await Promise.all([
            database_1.prisma.order.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.order.count({ where }),
        ]);
        return { orders, total };
    }
    async create(userId, data) {
        return database_1.prisma.order.create({
            data: {
                userId,
                symbol: data.symbol,
                side: data.side,
                quantity: data.quantity,
                price: data.price,
                status: 'PENDING',
            },
        });
    }
    async updateStatus(id, status) {
        return database_1.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async countByStatus(status) {
        return database_1.prisma.order.count({ where: { status } });
    }
    async countAll() {
        return database_1.prisma.order.count();
    }
}
exports.OrderRepository = OrderRepository;
exports.orderRepository = new OrderRepository();
//# sourceMappingURL=order.repository.js.map