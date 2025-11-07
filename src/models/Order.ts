// src/models/Order.ts

import { OrderState } from '../designPatterns/State/OrderState';
import { CartState } from '../designPatterns/State/CartState';
import { OrderPrototype } from '../designPatterns/Prototype/OrderPrototype';

export class Order implements OrderPrototype {
    // 💡 중요: Vue의 반응성 시스템 및 TS2345 오류 해결을 위해 public으로 변경
    public state: OrderState;
    public orderId: number;
    public items: string[];
    public totalAmount: number;

    constructor(orderId: number, items: string[], totalAmount: number) {
        this.orderId = orderId;
        this.items = items;
        this.totalAmount = totalAmount;
        // 초기 상태 설정
        this.state = new CartState(this);
    }

    // Context: 상태 설정 메서드
    public setState(state: OrderState): void {
        this.state = state;
    }

    // Context: 상태 객체에 요청 위임 (State Pattern 활용)
    public requestPayment(): void {
        this.state.handlePayment();
    }
    public requestShipping(): void {
        this.state.handleShipping();
    }
    public requestDelivery(): void {
        this.state.handleDelivery();
    }

    public getCurrentStatus(): string {
        return this.state.getStatusName();
    }

    // Prototype Pattern 메서드 구현
    public clone(): Order {
        const clonedOrder = new Order(
            Date.now(), // 새 ID 부여
            [...this.items], // 배열 깊은 복사
            this.totalAmount
        );
        // 복제된 주문은 CartState로 리셋
        clonedOrder.setState(new CartState(clonedOrder));
        return clonedOrder;
    }
}