import express , { Request , Response } from 'express'
import { User , UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store = new UserStore()

const {
    TOKEN_SECRET
}= process.env

// const index = async (_req: Request, res: Response) => {
//     const users = await store.index()
//     res.json(users)
// }

// const authenticate = async (req: Request, res: Response) => {

//     const user:User = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password
//     }

//     try {
//         const u = await store.authenticate(user.firstName, user.lastName , user.password)
//         //@ts-ignore
//         var token = jwt.sign({ user: u }, TOKEN_SECRET);
//         res.json(token)
//     } catch(error) {
//         res.status(401)
//         res.json({ error })
//     }
// }

const index = async (req: Request, res: Response) => {
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

    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
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

    const id = Number(req.params.id)
    const user = await store.show(id)
    res.json(user)
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
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        try
        {
        const newuser = await store.create(user)
        //@ts-ignore
        var token = jwt.sign({user: newuser}, TOKEN_SECRET)
        res.json(token)
    }
    catch(err)
    {
        res.status(400)
        res.json("error" + user)
    }
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}



const user_routes = (app: express.Application) => {
    // app.get('/users/authenticate', authenticate)
    app.get('/users', index),
    app.get('/user/:id', show)
    app.post('/users/adduser', add)
}


export default user_routes