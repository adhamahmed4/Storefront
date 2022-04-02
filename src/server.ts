import express , { Request , Response } from 'express'
import bodyParser from 'body-parser'
import order_routes from './handlers/orders_handler'
import product_routes from './handlers/products_handler'
import user_routes from './handlers/users_handler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
order_routes(app)
product_routes(app)
user_routes(app)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})