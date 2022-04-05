//@ts-ignore
import client from "../database";

export type Order = {
    id?: number;
    user_id: string;
    status: string;
}

export class OrderStore {
    async getCompletedOrders(id: number): Promise<Order[]> {
        try
        {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE status = \'complete\' AND user_id = ($1)'
            const result = await conn.query(sql,[id])
            conn.release()
    
            return result.rows
        }
        catch(err)
        {
            throw new Error(`Cannot get orders ${err}`)
        }
    }


    async getCurrentOrder(id: number): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE status = \'active\' AND user_id = ($1)'
        //@ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }


      async create(o: Order): Promise<Order> {
        
        try {
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [o.user_id, o.status])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect()
            const result = await conn.query(ordersql, [orderId])
            const order = result.rows[0]
            if (order.status !== "active") {
              throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
      
            conn.release()
          } catch (err) {
            throw new Error(`${err}`)
          }

        try {
          const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
          const result = await conn.query(sql, [orderId, productId, quantity])
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
}