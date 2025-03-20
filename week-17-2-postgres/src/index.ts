import { client, createTables } from "./db/db";
import express, { Request, Response} from "express";client

const app = express();

// TODO: create routes to create, read, update and delete users and addresses
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "app under progress"
    })
})

app.listen(3000, async () => {
    try{
        await createTables();
        console.log("App is running on port 3000");
    } catch(error){
        console.log("Error occured while creating tables: ", error);
    }
});