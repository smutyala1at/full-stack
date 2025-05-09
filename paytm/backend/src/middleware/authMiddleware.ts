import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

interface Decode {
    userId: mongoose.Types.ObjectId;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({
            message: "No Authorization header"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as Decode).userId;
        next();
    } catch(err) {
        res.status(401).json({
            message: "Invalid token"
        })
        return;
    }
}

export { authMiddleware };