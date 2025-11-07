<script setup lang="ts">
import { ref } from 'vue';
import { Order } from './models/Order';
import { OrderFacade } from './designPatterns/Facade/OrderFacade';

// 초기 주문 객체 생성 (State Context)
const initialOrder = new Order(1001, ['노트북', '마우스'], 1500000);
const currentOrder = ref(initialOrder); // 반응형으로 관리

// Facade 객체 생성
const orderFacade = new OrderFacade();
const orderHistory = ref([currentOrder.value]); // 주문 내역

// --- Facade 및 State 패턴 작동 ---
const handlePlaceOrder = () => {
  // Facade를 통해 복잡한 로직 실행 (재고 -> 결제 -> 상태 전환)
  orderFacade.placeOrder(currentOrder.value);
};

const handleShipOrder = () => {
  // State Pattern을 통해 상태 직접 변경 요청 (PaidState에서 ShippingState로 전환)
  currentOrder.value.requestShipping();
};

const handleDeliverOrder = () => {
  // State Pattern을 통해 상태 직접 변경 요청 (ShippingState에서 DeliveredState로 전환)
  currentOrder.value.requestDelivery();
};

// --- Prototype 및 Facade 패턴 작동 ---
const handleReorder = () => {
  // Facade를 통해 Prototype Pattern을 활용하여 재주문 생성
  const newOrder = orderFacade.createReorder(currentOrder.value);

  // 새 주문을 주문 내역에 추가
  orderHistory.value.push(newOrder);

  // 새 주문을 현재 주문으로 설정하고 바로 주문/결제 프로세스 진행
  currentOrder.value = newOrder;
  orderFacade.placeOrder(newOrder);
};
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>🛒 디자인 패턴 데모 (Vue + TS)</h2>
    <p>개발자 도구 **콘솔**을 열어 로직의 흐름을 확인하세요.</p>

    <hr>

    <h3>**[State Pattern Context] 현재 주문 정보 (ID: {{ currentOrder.orderId }})**</h3>
    <p>
      **상태:** <span style="font-weight: bold; color: blue;">{{ currentOrder.getCurrentStatus() }}</span>
    </p>
    <p>총액: {{ currentOrder.totalAmount.toLocaleString() }}원</p>

    <hr>

    <h3>**[Facade & State Action]**</h3>
    <button @click="handlePlaceOrder" :disabled="currentOrder.getCurrentStatus() !== '장바구니'">
      1. 주문/결제하기 (Facade 호출)
    </button>
    <button @click="handleShipOrder" :disabled="currentOrder.getCurrentStatus() !== '결제 완료 (배송 대기)'">
      2. 배송 시작 (State 전환)
    </button>
    <button @click="handleDeliverOrder" :disabled="currentOrder.getCurrentStatus() !== '배송 중'">
      3. 배송 완료 (State 전환)
    </button>
    <br><br>

    <h3>**[Facade & Prototype Action]**</h3>
    <button @click="handleReorder">
      4. 현재 주문 복제 후 재주문 (Facade + Prototype)
    </button>

    <hr>

    <h3>**주문 내역 (Prototype 확인)**</h3>
    <ul>
      <li v-for="order in orderHistory" :key="order.orderId">
        **주문 #{{ order.orderId }}**: {{ order.items.join(', ') }} /
        상태: **{{ order.getCurrentStatus() }}**
      </li>
    </ul>
  </div>
</template>