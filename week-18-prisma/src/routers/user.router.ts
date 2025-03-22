import { Router, Request, Response } from "express";
import { createUser, login } from "../services/user.services";
import { DatabaseError, DuplicateResourceError, NotFoundError, ValidationError } from "../errors/custom.errors";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response): Promise<void> => {
    try{
        await createUser(req.body);
        res.status(201).json({
            message: "User signup successful"
        });
        return;
    } catch(error){
        if(error instanceof ValidationError){
            res.status(422).json(error);
            return;
        }

        if(error instanceof DuplicateResourceError){
            res.status(409).json({
                message: error.message
            });
            return;
        }

        if(error instanceof DatabaseError){
            res.status(500).json({
                message: error.message
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});


userRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await login(req.body);
        res.status(200).json({
            message: "User login successful",
            token
        })
        return;
    } catch (error) {
        if(error instanceof ValidationError){
            res.status(422).json(error);
            return;
        }

        if(error instanceof NotFoundError){
            res.status(404).json({
                message: error.message
            });
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
})