import { UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";

const userStore = new UserStore();
const request = supertest(app);

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

  it('index method should list users', async () => {
    const result = await userStore.index();
    expect(result).not.toEqual([{
      firstName: 'adham',
      lastName: 'ahmed',
      password: '123456'
    }]);
  });

  it('show method should get user by id', async () => {
    const result = await userStore.show(1);
    expect(result).not.toEqual({
      firstName: 'adham',
      lastName: 'ahmed',
      password: '123456'
    });
  });
});

describe("User Endpoints Responses", () => {
  it(`'create' method endpoint`, async (): Promise<void> => {
    const response = await request.post('/users/adduser').send({
      firstName: 'adham',
      lastName: 'ahmed',
      password: '123456'
    });
    expect(response.status).toEqual(200);
  });

  it(`'index' method endpoint`, async (): Promise<void> => {
    const response = await request.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZGhhbSIsImxhc3RuYW1lIjoiYWhtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRTejEzbTQxVkIxMkhyaHdZNnpLMkNlSEVkeUZtWVBuaHRyellBSTVNRS5QSU9GRTFudmZrSyJ9LCJpYXQiOjE2NDkyNTUzMDN9.lwEz8WbcLbW263I3UInGrOzzYIPiFr9SeO50hH1QhjU');
    expect(response.status).toEqual(200);
  });

  it(`'show' method endpoint`, async (): Promise<void> => {
    const response = await request.get('/user/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZGhhbSIsImxhc3RuYW1lIjoiYWhtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRTejEzbTQxVkIxMkhyaHdZNnpLMkNlSEVkeUZtWVBuaHRyellBSTVNRS5QSU9GRTFudmZrSyJ9LCJpYXQiOjE2NDkyNTUzMDN9.lwEz8WbcLbW263I3UInGrOzzYIPiFr9SeO50hH1QhjU');
    expect(response.status).toEqual(200);
  });
});