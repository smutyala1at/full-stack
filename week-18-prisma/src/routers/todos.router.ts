import Router, { Request, Response } from "express";
import { addTodo, getTodos } from "../services/todos.services";
import { DatabaseError, ValidationError } from "../errors/custom.errors";

export const todosRouter = Router();

todosRouter.post("/", async (req: Request, res: Response): Promise<void> => {
    try{
        await addTodo({...req.body, userId: req.userId});

        res.status(201).json({
            message: "Todo created succesfully"
        })
        return;
    } catch(error){
        if(error instanceof ValidationError){
            res.status(422).json(error);
            return;
        }

        if(error instanceof DatabaseError){
            res.status(500).json({
                message: error.message
            })
            return;
        }

        res.status(500).json({
            message: "Internal server error"
        })
        return;
    }
});


todosRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    try{
        const todos = await getTodos(req.userId as number);

        res.status(200).json({
            todos
        })
        return;
    } catch(error){
        if(error instanceof DatabaseError){
            res.status(500).json({
                message: error.message
            })
            return;
        }

        res.status(500).json({
            message: "Internal server error"
        })
        return;
    }
})


todosRouter.put("/:id")