import { Order, OrderSide, OrderStatus } from '../generated/prisma';
import { orderRepository } from '../repositories/order.repository';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/ApiError';
import { CreateOrderInput } from '../validators/order.validator';
import { PaginatedResponse } from '../interfaces';

export class OrderService {
  async getOrderById(id: string): Promise<Order> {
    const order = await orderRepository.findById(id);
    if (!order) throw ApiError.notFound(`Order '${id}' not found`);
    return order;
  }

  async getUserOrders(
    userId: string,
    filters: { symbol?: string; side?: OrderSide; status?: OrderStatus } = {},
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<Order>> {
    const skip = (page - 1) * limit;
    const { orders, total } = await orderRepository.findByUserId(userId, filters, skip, limit);
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

  async createOrder(userId: string, data: CreateOrderInput): Promise<Order> {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound('User not found');

    // Phase 3: Validate balance, execute trade, update portfolio
    // For now: record the order as PENDING
    const order = await orderRepository.create(userId, data);
    return order;
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    if (order.userId !== userId) throw ApiError.forbidden('Cannot cancel another user\'s order');
    if (order.status !== 'PENDING') throw ApiError.badRequest('Only PENDING orders can be cancelled');
    return orderRepository.updateStatus(orderId, 'CANCELLED');
  }

  async getTotalOrderCount(): Promise<number> {
    return orderRepository.countAll();
  }
}

export const orderService = new OrderService();
