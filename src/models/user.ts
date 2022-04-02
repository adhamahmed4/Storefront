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


    async authenticate(firstName: string, lastName: string , password: string): Promise<User | null> {
        //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT password FROM users WHERE firstName=($1) AND lastName=($2)'
            const result = await conn.query(sql, [firstName, lastName])

            if(result.rows.length)
            {
                const user = result.rows[0]
                if(bcrypt.compareSync(password+PEPPER, user.password))
                {
                    return user
                }
            }
            conn.release()
            return null
    }

}