import Router from "express";
import { userRouter } from "./user";
import { accountRouter } from "./account";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);


export { rootRouter };