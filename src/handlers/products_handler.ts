import express , { Request , Response } from 'express'
import { Product , ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await store.show(id)
    res.json(product)
}

const getProductByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    const products = await store.getProductByCategory(category)
    res.json(products)
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
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

            const newproduct = await store.create(product)
            res.json(newproduct)
    }
    catch(error)
    {
        res.status(400)
        res.json(error)
    }
}


const product_routes = (app: express.Application) => {
    app.get('/products', index),
    app.get('/product/:id', show),
    app.get('/products/:category', getProductByCategory),
    app.post('/products', add)
}


export default product_routes