// src/services/PaymentService.ts

export class PaymentService {
    processPayment(amount: number): boolean {
        console.log(`[Payment] 결제 처리 요청: ${amount}원`);
        return true; // Mock: 항상 성공
    }
}