import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import validateToken from '../middlewares/authentication'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store = new UserStore()

const {
    TOKEN_SECRET
} = process.env


const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const user = await store.show(id)
        res.json(user)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}


const add = async (req: Request, res: Response) => {

    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        try {
            const newuser = await store.create(user)
            //@ts-ignore
            var token = jwt.sign({ user: newuser }, TOKEN_SECRET)
            res.json(token)
        }
        catch (err) {
            res.status(400)
            res.json("error" + user)
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}



const user_routes = (app: express.Application) => {
    app.get('/users', validateToken, index),
    app.get('/user/:id' ,validateToken , show)
    app.post('/users/adduser', add)
}


export default user_routes