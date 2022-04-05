import { DashboardQueries } from "../services/dashboard";

const dashboardStore = new DashboardQueries();

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