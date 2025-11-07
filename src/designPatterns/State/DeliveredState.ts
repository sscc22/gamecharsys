// src/designPatterns/State/DeliveredState.ts

import { OrderState } from './OrderState';
import { Order } from '../../models/Order';

export class DeliveredState implements OrderState {
    constructor(public order: Order) {}

    getStatusName(): string {
        return '배송 완료';
    }

    handlePayment(): void {
        console.log('이미 완료된 주문입니다. 결제할 수 없습니다.');
    }

    handleShipping(): void {
        console.log('이미 완료된 주문입니다. 배송을 시작할 수 없습니다.');
    }

    handleDelivery(): void {
        console.log('이미 배송이 완료된 주문입니다.');
    }
}