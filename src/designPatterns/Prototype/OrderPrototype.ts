// src/designPatterns/Prototype/OrderPrototype.ts

import { Order } from '../../models/Order';

export interface OrderPrototype {
    clone(): Order; // 자신과 동일한 객체를 반환하는 메서드
}