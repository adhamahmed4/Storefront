import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import validateToken from '../middlewares/authentication'

const store = new OrderStore()

const getCompletedOrders = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const orders = await store.getCompletedOrders(id)
        res.json(orders)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getCurrentOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const order = await store.getCurrentOrder(id)
        res.json(order)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,

        }
        const neworder = await store.create(order)
        res.json(neworder)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.body.order_id
        const productId: string = req.body.product_id
        const quantity: number = parseInt(req.body.quantity)

        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.send(`${err}`)
    }
}



const order_routes = (app: express.Application) => {
    app.get('/orders/:id' ,validateToken , getCompletedOrders),
        app.get('/order/:id' ,validateToken , getCurrentOrder),
        app.post('/orders' ,validateToken , add),
        app.post('/orders/addproducts' ,validateToken , addProduct)
}


export default order_routes