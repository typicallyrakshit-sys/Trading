import { Order, OrderSide, OrderStatus } from '../generated/prisma';
import { CreateOrderInput } from '../validators/order.validator';
export declare class OrderRepository {
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string, filters?: {
        symbol?: string;
        side?: OrderSide;
        status?: OrderStatus;
    }, skip?: number, take?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    create(userId: string, data: CreateOrderInput): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    countByStatus(status: OrderStatus): Promise<number>;
    countAll(): Promise<number>;
}
export declare const orderRepository: OrderRepository;
//# sourceMappingURL=order.repository.d.ts.map