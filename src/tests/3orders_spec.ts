import {OrderStore} from "../models/order";

const orderStore = new OrderStore();

describe("Order Model", () => {
    it('should have a getCompletedOrders method', () => {
      expect(orderStore.getCompletedOrders).toBeDefined();
    });
  
    it('should have a getCurrentOrder method', () => {
      expect(orderStore.getCurrentOrder).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(orderStore.create).toBeDefined();
    });

    it('should have an addProduct method', () => {
      expect(orderStore.addProduct).toBeDefined();
    });
  
    it('create method should add an active order', async () => {
      const result = await orderStore.create({
        user_id: '1',
        status: 'active'
      });
      expect(result).toEqual({
        id: 1,
        user_id: '1',
        status: 'active'
      });
    });

    it('create method should add a complete order', async () => {
      const result = await orderStore.create({
        user_id: '1',
        status: 'complete'
      });
      expect(result).toEqual({
        id: 2,
        user_id: '1',
        status: 'complete'
      });
    });
  
    it('getCurrentOrder method should get current order', async () => {
      const result = await orderStore.getCurrentOrder(1);
      expect(result).toEqual({
        id: 1,
        user_id: '1',
        status: 'active'
      });
    });
    it('getCompletedOrders method should list completed orders', async () => {
      const result = await orderStore.getCompletedOrders(1);
      expect(result).toEqual([{
        id: 2,
        user_id: '1',
        status: 'complete'
        }]);
    });
    it('addProduct method should add a product to an order', async () => {
      const result = await orderStore.addProduct(15,'1','1');
      expect(result).toEqual({
        id: 1,
        quantity: 15,
        order_id: '1',
        product_id: '1'
        });
    });
  });