import Router from "express";

export const todosRouter = Router();

todosRouter.get("/", async (req, res) => {
    console.log("userid: ", req.userId);
});