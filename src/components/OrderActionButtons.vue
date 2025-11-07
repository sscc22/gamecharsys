<script setup lang="ts">
import { ref } from 'vue';
import { Order } from '../models/Order';
import { OrderFacade } from '../designPatterns/Facade/OrderFacade';

// Props 또는 Pinia/Vuex 등으로 현재 Order 객체를 가져온다고 가정
const props = defineProps<{
  currentOrder: Order
}>();

const orderFacade = new OrderFacade();
const currentOrder = ref(props.currentOrder);

const handlePlaceOrder = () => {
  orderFacade.placeOrder(currentOrder.value);
  // UI 업데이트를 위해 currentOrder.value는 반응형으로 관리되어야 합니다.
  // 여기서는 간단히 로그로 대체합니다.
};

const handleReorder = () => {
  // Facade를 통해 Prototype Pattern을 활용하여 재주문 생성
  const newOrder = orderFacade.createReorder(currentOrder.value);

  // 생성된 새 주문으로 현재 주문을 대체하거나(예시), 새 주문 리스트에 추가합니다.
  currentOrder.value = newOrder;

  // 생성된 새 주문에 대해 주문 로직 실행
  orderFacade.placeOrder(newOrder);
};
</script>

<template>
  <div>
    <p>현재 주문 상태: **{{ currentOrder.getCurrentStatus() }}**</p>
    <button @click="handlePlaceOrder"
            :disabled="currentOrder.getCurrentStatus() !== '장바구니'">
      주문하기 (Facade)
    </button>
    <button @click="handleReorder">
      이전 주문으로 재주문 (Facade + Prototype)
    </button>
  </div>
</template>