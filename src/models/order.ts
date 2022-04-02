import client from "../database";

export type Order = {
    id?: number;
    product_id: number;
    quantity: number;
    user_id: number;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try
        {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
    
            return result.rows
        }
        catch(err)
        {
            throw new Error(`Cannot get orders ${err}`)
        }
    }


    async show(id: number): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
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
      const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order ${name}. Error: ${err}`)
        }
    }

    // async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    //     // try {
    //     //     const ordersql = 'SELECT * FROM orders WHERE id=($1)'
    //     //     const conn = await client.connect()
    //     //     const result = await conn.query(ordersql, [orderId])
    //     //     const order = result.rows[0]
    //     //     if (order.status !== "Open") {
    //     //       throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
    //     //     }
      
    //     //     conn.release()
    //     //   } catch (err) {
    //     //     throw new Error(`${err}`)
    //     //   }

    //     try {
    //       const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
    //       const conn = await client.connect()
    //       const result = await conn.query(sql, [quantity, orderId, productId])
    //       const order = result.rows[0]
    
    //       conn.release()
    
    //       return order
    //     } catch (err) {
    //       throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    //     }
    //   }


    async delete(id: number): Promise<Order> {
        try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }


    async update(o: Order): Promise<Order> {
        try {
      const sql = 'UPDATE orders SET product_id = ($1), quantity = ($2) status = ($3) WHERE id = ($4) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [o.product_id, o.quantity, o.status, o.id])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`)
        }
    }

}