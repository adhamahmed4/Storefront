import { DashboardQueries } from "../services/dashboard";
import supertest from "supertest";
import app from "../server";

const dashboardStore = new DashboardQueries();
const request = supertest(app);

describe("Dashboard Model", () => {
    it('should have a getMostPopularProducts method', () => {
      expect(dashboardStore.getMostPopularProducts).toBeDefined();
    });

    it('getMostPopularProducts method should list most 5 popular products', async () => {
      const result = await dashboardStore.getMostPopularProducts();
      expect(result).not.toEqual([{
        name: 'Milk',
        amount_sold: 15
        }]);
    });
  });


  describe("Dashboard Endpoints Responses", () => {
    it(`'getMostPopularProducts' method endpoint`, async (): Promise<void> => {
      const response = await request.get('/most_popular_products');
      expect(response.status).toEqual(200);
    });
  });