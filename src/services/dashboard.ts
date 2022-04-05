//@ts-ignore
import client from "../database";


export class DashboardQueries {

    async getMostPopularProducts(): Promise<{name: string, amount_sold: number}[]> {
      try {
          //@ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT name, SUM(quantity) AS amount_sold FROM order_products inner join products ON order_products.product_id = products.id GROUP BY name ORDER BY amount_sold DESC LIMIT 5;'
        const result = await conn.query(sql)
        conn.release()
  
        return result.rows
      } catch (err) {
        throw new Error(`unable to get products: ${err}`)
      } 
    }
  }

