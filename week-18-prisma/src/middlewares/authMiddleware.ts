import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/custom.errors";
import jwt from "jsonwebtoken";
import { Tokenpayload } from "../types/types";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            throw new AuthenticationError("Token not provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Tokenpayload;
        
        if(decoded.exp <= Math.floor(Date.now() / 1000)){
            throw new AuthenticationError("Token expired");
        }

        req.userId = decoded.id;
        next();
    } catch(error){
        if(error instanceof AuthenticationError){
            res.status(401).json({
                message: error.message
            })
            return;
        }

        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({
                message: "Invalid token"
            })
            return;
        }

        res.status(500).json({
            message: "Internal server error"
        })
        return;
    }
}