import {ProductStore} from "../models/product";
import supertest from "supertest";
import app from "../server";

const productStore = new ProductStore();
const request = supertest(app);

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a getProductByCategory method', () => {
    expect(productStore.getProductByCategory).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await productStore.create({
      name: 'Milk',
      price: 12,
      category: 'Beverages'
    });
    expect(result).toEqual({
      id: 1,
      name: 'Milk',
      price: 12,
      category: 'Beverages'
    });
  });

  it('index method should list products', async () => {
    const result = await productStore.index();
    expect(result).toEqual([{
       id: 1, 
       name: 'Milk', 
       price: 12, 
       category: 'Beverages' 
      }]);
  });
  it('show method should list product with id 1', async () => {
    const result = await productStore.show(1);
    expect(result).toEqual({
       id: 1, 
       name: 'Milk', 
       price: 12, 
       category: 'Beverages' 
      });
  });
  it('getProductByCategory method should list all products with given category', async () => {
    const result = await productStore.getProductByCategory('Beverages');
    expect(result).toEqual([{
       id: 1, 
       name: 'Milk', 
       price: 12, 
       category: 'Beverages' 
      }]);
  });
});



describe("Product Endpoints Responses", () => {
  it(`'index' method endpoint`, async (): Promise<void> => {
    const response = await request.get('/products');
    expect(response.status).toEqual(200);
  });

  it(`'show' method endpoint`, async (): Promise<void> => {
    const response = await request.get('/product/1');
    expect(response.status).toEqual(200);
  });

  it(`'getProductByCategory' method endpoint`, async (): Promise<void> => {
    const response = await request.get('/products/Beverages');
    expect(response.status).toEqual(200);
  });
});



