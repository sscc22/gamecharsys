// src/designPatterns/State/PaidState.ts

import { OrderState } from './OrderState';
import { Order } from '../../models/Order';
import { ShippingState } from './ShippingState';

export class PaidState implements OrderState {
    constructor(public order: Order) {}

    getStatusName(): string {
        return '결제 완료 (배송 대기)';
    }

    handlePayment(): void {
        console.log('이미 결제 완료 상태입니다.');
    }

    handleShipping(): void {
        // 결제 완료 상태 -> 배송 중 상태로 전환
        this.order.setState(new ShippingState(this.order));
        console.log(`[State] 주문 #${this.order.orderId} 배송 시작됨.`);
    }

    handleDelivery(): void {
        console.log('아직 배송 중이 아닙니다.');
    }
}