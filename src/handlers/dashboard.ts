import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()


const getMostPopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.getMostPopularProducts()
    res.json(products)
  }
  catch (error) {
    res.status(400)
    res.json(error)
  }
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/most_popular_products', getMostPopularProducts)
}

export default dashboardRoutes