import { Order, OrderSide, OrderStatus } from '../generated/prisma';
import { CreateOrderInput } from '../validators/order.validator';
import { PaginatedResponse } from '../interfaces';
export declare class OrderService {
    getOrderById(id: string): Promise<Order>;
    getUserOrders(userId: string, filters?: {
        symbol?: string;
        side?: OrderSide;
        status?: OrderStatus;
    }, page?: number, limit?: number): Promise<PaginatedResponse<Order>>;
    createOrder(userId: string, data: CreateOrderInput): Promise<Order>;
    cancelOrder(orderId: string, userId: string): Promise<Order>;
    getTotalOrderCount(): Promise<number>;
}
export declare const orderService: OrderService;
//# sourceMappingURL=order.service.d.ts.map