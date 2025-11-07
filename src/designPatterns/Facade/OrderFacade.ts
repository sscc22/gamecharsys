// src/designPatterns/Facade/OrderFacade.ts

import { Order } from '../../models/Order';
import { InventoryService } from '../../services/InventoryService';
import { PaymentService } from '../../services/PaymentService';

export class OrderFacade {
    private inventory: InventoryService;
    private payment: PaymentService;

    constructor() {
        this.inventory = new InventoryService();
        this.payment = new PaymentService();
    }

    // Facade 메서드: 주문/결제 과정을 단순화
    public placeOrder(order: Order): boolean {
        console.log(`\n=== FACADE: 주문 #${order.orderId} 접수 시작 (State, Inventory, Payment Subsystems 통합) ===`);

        // 1. 재고 확인
        if (!this.inventory.checkStock(order.items)) {
            console.log('재고 부족으로 주문 실패');
            return false;
        }

        // 2. 결제 처리
        if (!this.payment.processPayment(order.totalAmount)) {
            console.log('결제 실패');
            return false;
        }

        // 3. 상태 업데이트 (State Pattern 활용)
        order.requestPayment();

        console.log(`=== FACADE: 주문 #${order.orderId} 성공 및 결제 완료 ===`);
        return true;
    }

    // Facade 메서드: 주문 복제를 통한 재주문 생성
    public createReorder(originalOrder: Order): Order {
        console.log(`\n--- FACADE: 주문 #${originalOrder.orderId} 재주문 요청 (Prototype Pattern 활용) ---`);
        // Prototype Pattern 활용
        const newOrder = originalOrder.clone();
        console.log(`--- PROTOTYPE: 새 주문 #${newOrder.orderId} 생성 완료 (CartState로 초기화) ---`);
        return newOrder;
    }
}