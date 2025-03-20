import dotenv from "dotenv"
dotenv.config();
import { Client } from "pg";

export const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT as string),
    database: process.env.DATABASE
});

const connect = async () => {
    try{
        await client.connect();
        console.log("Connected to the database");
    } catch(error){
        console.log("Error connecting to the database: ", error);
    }
}

export const createTables = async () => {
    try{
        await connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `)

        await client.query(`
            CREATE TABLE IF NOT EXISTS address(
                id SERIAL PRIMARY KEY,
                street VARCHAR(100) NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(100) NOT NULL,
                country VARCHAR(50) NOT NULL,
                pincode VARCHAR(10) NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `)
    } catch(error){
        console.log("Error creating tables: ", error);
    }
}