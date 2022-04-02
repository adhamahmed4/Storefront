import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try
        {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
    
            return result.rows
        }
        catch(err)
        {
            throw new Error(`Cannot get products ${err}`)
        }
    }


    async show(id: Number): Promise<Product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }


      async create(p: Product): Promise<Product> {
        try {
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [p.name, p.price, p.category])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new product ${name}. Error: ${err}`)
        }
    }


    async delete(id: number): Promise<Product> {
        try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }


    async update(p: Product): Promise<Product> {
        try {
      const sql = 'UPDATE products SET name = ($1), price = ($2) , category = ($3) WHERE id = ($4) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [p.name,p.price,p.category,p.id])
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update product ${p.id}. Error: ${err}`)
        }
    }

}