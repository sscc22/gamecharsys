// src/services/InventoryService.ts

export class InventoryService {
    checkStock(items: string[]): boolean {
        console.log(`[Inventory] 재고 확인: ${items.join(', ')}`);
        return true; // Mock: 항상 재고 있음
    }
}