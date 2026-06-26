import { prisma } from '../config/database';
import { Order, OrderSide, OrderStatus } from '../generated/prisma';
import { CreateOrderInput } from '../validators/order.validator';

export class OrderRepository {
  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  async findByUserId(
    userId: string,
    filters: { symbol?: string; side?: OrderSide; status?: OrderStatus } = {},
    skip = 0,
    take = 20,
  ): Promise<{ orders: Order[]; total: number }> {
    const where = { userId, ...filters };
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);
    return { orders, total };
  }

  async create(userId: string, data: CreateOrderInput): Promise<Order> {
    return prisma.order.create({
      data: {
        userId,
        symbol: data.symbol,
        side: data.side as OrderSide,
        quantity: data.quantity,
        price: data.price,
        status: 'PENDING',
      },
    });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async countByStatus(status: OrderStatus): Promise<number> {
    return prisma.order.count({ where: { status } });
  }

  async countAll(): Promise<number> {
    return prisma.order.count();
  }
}

export const orderRepository = new OrderRepository();
