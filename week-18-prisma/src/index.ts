import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { userRouter } from "./routers/user.router";
import { todosRouter } from "./routers/todos.router";
import { authMiddleware } from "./middlewares/authMiddleware";

export const client = new PrismaClient();

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todos", authMiddleware, todosRouter);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        message: "Route not found"
    })
});

app.listen(3000, () => {
    console.log("Server is running on the port 3000");
});
