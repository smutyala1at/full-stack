import dotenv from 'dotenv';
dotenv.config();
import { Client } from "pg";

const pgClient = new Client({
    user: process.env.PGUSER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT as string),
    database: process.env.DATABASE
})


const connectDB = async () => {
    try {
        await pgClient.connect();
        console.log("db connected");

        // create a table
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS users(
                Id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log("users table created");

        // add users into db table
        await pgClient.query(`
            INSERT INTO users(name, email, password)
            VALUES ('santosh', 'santosh@gmail.com', 'santosh123'), ('saskia', 'saskia@gmail.com', 'saskia123')
        `);
        console.log("users added");

        // get all users from db
        const users = await pgClient.query("SELECT * FROM users");
        console.log(users.rows);
        
        // update user details
        const updateUser = await pgClient.query(`
            UPDATE users 
            SET email='santoshm@gmail.com'
            WHERE name='santosh'
        `)
        console.log("user updated", updateUser.rowCount);

    } catch(error){
        console.log(error);
    }
}

connectDB();