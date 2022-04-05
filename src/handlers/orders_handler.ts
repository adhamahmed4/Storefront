import express , { Request , Response } from 'express'
import { Order , OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store = new OrderStore()

const getCompletedOrders = async (req: Request, res: Response) => {

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

    const id = parseInt(req.params.id)
    const orders = await store.getCompletedOrders(id)
    res.json(orders)
}

const getCurrentOrder = async (req: Request, res: Response) => {

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

    const id = parseInt(req.params.id)
    const order = await store.getCurrentOrder(id)
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
            user_id: req.body.user_id,
            status: req.body.status,

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

const addProduct = async (req: Request, res: Response) => {


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

    const orderId: string = req.body.order_id
    const productId: string = req.body.product_id
    const quantity: number = parseInt(req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.send(`${err}`)
    }
  } 



const order_routes = (app: express.Application) => {
    app.get('/orders/:id', getCompletedOrders),
    app.get('/order/:id', getCurrentOrder),
    app.post('/orders', add),
    app.post('/orders/addproducts', addProduct)
}


export default order_routes