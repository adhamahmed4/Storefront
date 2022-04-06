import {OrderStore} from "../models/order";
import supertest from "supertest";
import app from "../server";

const orderStore = new OrderStore();
const request = supertest(app);

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


  describe("Order Endpoints Responses", () => {
    it(`'getCompletedOrders' method endpoint`, async (): Promise<void> => {
      const response = await request.get('/orders/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZGhhbSIsImxhc3RuYW1lIjoiYWhtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRTejEzbTQxVkIxMkhyaHdZNnpLMkNlSEVkeUZtWVBuaHRyellBSTVNRS5QSU9GRTFudmZrSyJ9LCJpYXQiOjE2NDkyNTUzMDN9.lwEz8WbcLbW263I3UInGrOzzYIPiFr9SeO50hH1QhjU');
      expect(response.status).toEqual(200);
    });
  
    it(`'getCurrentOrder' method endpoint`, async (): Promise<void> => {
      const response = await request.get('/order/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZGhhbSIsImxhc3RuYW1lIjoiYWhtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRTejEzbTQxVkIxMkhyaHdZNnpLMkNlSEVkeUZtWVBuaHRyellBSTVNRS5QSU9GRTFudmZrSyJ9LCJpYXQiOjE2NDkyNTUzMDN9.lwEz8WbcLbW263I3UInGrOzzYIPiFr9SeO50hH1QhjU');
      expect(response.status).toEqual(200);
    });

  });