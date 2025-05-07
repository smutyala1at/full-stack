import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db";
import { rootRouter } from "./routes";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// import main router
app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, async () => {
    console.log("Server is running on port", process.env.PORT);
    await connectDB();
})