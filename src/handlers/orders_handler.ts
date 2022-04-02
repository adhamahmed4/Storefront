import express , { Request , Response } from 'express'
import { Order , OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const order = await store.show(id)
    res.json(order)
}

const add = async (req: Request, res: Response) => {
    
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json(`Access denied, invalid token ${err}`)
        return
    }

    try
    {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }

            const neworder = await store.create(order)
            res.json(neworder)
    }
    catch(error)
    {
        res.status(400)
        res.json(error)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.body.order_id
    const productId: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.send(`${err}`)
    }
  } 


const destroy = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const order = await store.delete(id)
    res.json(order)
}

const update = async (req: Request, res: Response) => {
    try
    {
        const order: Order = {
            id: parseInt(req.params.id),
            status: req.body.status,
            user_id: req.body.user_id
        }

            const neworder = await store.update(order)
            res.json(neworder)
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index),
    app.get('/order/:id', show),
    app.post('/orders', add),
    app.post('/orders/addproducts', addProduct)
    app.delete('/order/:id', destroy),
    app.put('/order/:id', update)
}


export default order_routes