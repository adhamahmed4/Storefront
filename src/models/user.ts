import bcrypt from 'bcrypt';
//@ts-ignore
import client from "../database";
import dotenv from 'dotenv'

dotenv.config()

export type User = {
    id?: Number;
    firstName: string;
    lastName: string;
    password: string;
}

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export class UserStore {

    async index(): Promise<User[]> {
        try
        {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
    
            return result.rows
        }
        catch(err)
        {
            throw new Error(`Cannot get users ${err}`)
        }
    }


    async show(id: Number): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        //@ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()

        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }



    async create(u: User): Promise<User> {
        try {
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        u.password + PEPPER,
        //@ts-ignore
        parseInt(SALT_ROUNDS)
     );
      const result = await conn.query(sql, [u.firstName, u.lastName, hash])
      const user = result.rows[0]
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Unable to create user ${u.firstName}. Error: ${err}`)
        }
    }
}