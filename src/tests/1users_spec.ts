import {UserStore} from "../models/user";

const userStore = new UserStore();

describe("User Model", () => {
    it('should have an index method', () => {
      expect(userStore.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
      });
  
    it('add method should create a user', async () => {
      const result = await userStore.create({
        firstName: 'adham',
        lastName: 'ahmed',
        password: '123456'
      });
      expect(result).not.toEqual({
        firstName: 'adham',
        lastName: 'ahmed',
        password: '123456'
      });
    });
  });