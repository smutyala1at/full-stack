import { client, createTables } from "./db/db";
import express, { Request, Response} from "express";client

const app = express();
app.use(express.json());

// TODO: create routes to create, read, update and delete users and addresses
app.post("/signup", async (req: Request, res: Response) => {
    try{
        const { name, email, password, street, city, state, country, pincode } = req.body;

        await client.query("BEGIN"); // start transaction
        
        // check if user already exists
        const userExistsQuery = `SELECT * FROM users WHERE email = $1`;
        const user = await client.query(userExistsQuery, [email]);

        if(user.rows.length > 0){
            res.status(400).json({
                message: "User already exists"
            })
            return;
        }

        // if user doesn't exists, insert user details into the database
        const addUserQuery = `INSERT into users (name, email, password) VALUES ($1, $2, $3) RETURNING id`
        const response = await client.query(addUserQuery, [name, email, password]);
        const userId = response.rows[0].id;

        const addAddressQuery = `INSERT into address (street, city, state, country, pincode, user_id) VALUES ($1, $2, $3, $4, $5, $6)`
        await client.query(addAddressQuery, [street, city, state, country, pincode, userId]); 
        
        await client.query("COMMIT"); // commit transaction

        res.status(200).json({
            message: "Signup successful"
        })
    } catch(error){
        await client.query("ROLLBACK");
        console.log("Error occurred while signing up: ", error);
        res.status(500).json({
            message: "Error occurred while signing up"
        })
    }
})

app.listen(3000, async () => {
    try{
        await createTables();
        console.log("App is running on port 3000");
    } catch(error){
        console.log("Error occured while creating tables: ", error);
    }
});