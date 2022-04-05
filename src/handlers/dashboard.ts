import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()


const getMostPopularProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.getMostPopularProducts()
  res.json(products)
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/most_popular_products', getMostPopularProducts)
}

export default dashboardRoutes