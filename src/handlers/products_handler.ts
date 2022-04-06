import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import validateToken from '../middlewares/authentication'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const show = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id)
        const product = await store.show(id)
        res.json(product)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }

}

const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category
        const products = await store.getProductByCategory(category)
        res.json(products)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newproduct = await store.create(product)
        res.json(newproduct)
    }
    catch (error) {
        res.status(400)
        res.json(error)
    }
}


const product_routes = (app: express.Application) => {
    app.get('/products', index),
        app.get('/product/:id', show),
        app.get('/products/:category', getProductByCategory),
        app.post('/products' ,validateToken , add)
}


export default product_routes