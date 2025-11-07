// src/designPatterns/State/ShippingState.ts

import { OrderState } from './OrderState';
import { Order } from '../../models/Order';
import { DeliveredState } from './DeliveredState';

export class ShippingState implements OrderState {
    constructor(public order: Order) {}

    getStatusName(): string {
        return '배송 중';
    }

    handlePayment(): void {
        console.log('이미 결제 완료되어 배송 중인 주문입니다.');
    }

    handleShipping(): void {
        console.log('이미 배송이 시작되었습니다.');
    }

    handleDelivery(): void {
        // 배송 중 상태 -> 배송 완료 상태로 전환
        this.order.setState(new DeliveredState(this.order));
        console.log(`[State] 주문 #${this.order.orderId} 배송 완료 상태로 전환되었습니다. (최종)`);
    }
}