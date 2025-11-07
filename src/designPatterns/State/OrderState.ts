// src/designPatterns/State/OrderState.ts

import { Order } from '../../models/Order';
export interface OrderState {
    order: Order;
    handlePayment(): void;
    handleShipping(): void;
    handleDelivery(): void;
    getStatusName(): string;
}