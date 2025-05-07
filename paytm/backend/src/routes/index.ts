import Router, { Request, Response } from "express";
import { userRouter } from "./user";

const rootRouter = Router();

rootRouter.use("/user", userRouter);


export { rootRouter };