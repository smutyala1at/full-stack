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
const db_1 = require("./db/db");
const express_1 = __importDefault(require("express"));
db_1.client;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// TODO: create routes to create, read, update and delete users and addresses
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, street, city, state, country, pincode } = req.body;
        yield db_1.client.query("BEGIN"); // start transaction
        // check if user already exists
        const userExistsQuery = `SELECT * FROM users WHERE email = $1`;
        const user = yield db_1.client.query(userExistsQuery, [email]);
        if (user.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }
        // if user doesn't exists, insert user details into the database
        const addUserQuery = `INSERT into users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const response = yield db_1.client.query(addUserQuery, [name, email, password]);
        const userId = response.rows[0].id;
        const addAddressQuery = `INSERT into address (street, city, state, country, pincode, user_id) VALUES ($1, $2, $3, $4, $5, $6)`;
        yield db_1.client.query(addAddressQuery, [street, city, state, country, pincode, userId]);
        yield db_1.client.query("COMMIT"); // commit transaction
        res.status(200).json({
            message: "Signup successful"
        });
    }
    catch (error) {
        yield db_1.client.query("ROLLBACK");
        console.log("Error occurred while signing up: ", error);
        res.status(500).json({
            message: "Error occurred while signing up"
        });
    }
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(400).json({
                message: "User id is required"
            });
            return;
        }
        const getQuery = `
            SELECT u.id, u.name, u.email, a.street, a.city, a.state, a.country, a.pincode
            FROM users u
            JOIN address a on u.id = a.user_id
            WHERE u.id = $1
        `;
        const response = yield db_1.client.query(getQuery, [id]);
        console.log(response);
        if (response.rows.length === 0) {
            res.status(404).json({
                message: "User with this id does not exists"
            });
            return;
        }
        const userData = response.rows[0];
        res.status(200).json({
            data: userData
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occured while fetching user data"
        });
    }
}));
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.createTables)();
        console.log("App is running on port 3000");
    }
    catch (error) {
        console.log("Failed to setup database: ", error);
    }
}));
