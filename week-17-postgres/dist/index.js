"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const pgClient = new pg_1.Client({
    user: process.env.PGUSER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.DATABASE
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgClient.connect();
        console.log("db connected");
        // create a table
        yield pgClient.query(`
            CREATE TABLE IF NOT EXISTS users(
                Id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log("users table created");
        // add users into db table
        yield pgClient.query(`
            INSERT INTO users(name, email, password)
            VALUES ('santosh', 'santosh@gmail.com', 'santosh123'), ('saskia', 'saskia@gmail.com', 'saskia123')
        `);
        console.log("users added");
        // get all users from db
        const users = yield pgClient.query("SELECT * FROM users");
        console.log(users.rows);
        // update user details
        const updateUser = yield pgClient.query(`
            UPDATE users 
            SET email='santoshm@gmail.com'
            WHERE name='santosh'
        `);
        console.log("user updated", updateUser.rowCount);
    }
    catch (error) {
        console.log(error);
    }
});
connectDB();
