// src/designPatterns/State/CartState.ts

import { OrderState } from './OrderState';
import { Order } from '../../models/Order';
import { PaidState } from './PaidState';

export class CartState implements OrderState {
    constructor(public order: Order) {}

    getStatusName(): string {
        return '장바구니';
    }

    handlePayment(): void {
        // 장바구니 상태 -> 결제 완료 상태로 전환
        this.order.setState(new PaidState(this.order));
        console.log(`[State] 주문 #${this.order.orderId} 결제 완료 상태로 전환되었습니다.`);
    }

    handleShipping(): void {
        console.log('결제(Paid) 상태가 아니므로 배송을 시작할 수 없습니다.');
    }

    handleDelivery(): void {
        console.log('결제(Paid) 상태가 아니므로 배송 완료 처리할 수 없습니다.');
    }
}