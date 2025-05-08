import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

interface Decode {
    userId: mongoose.Types.ObjectId;
}

interface AuthenticatedRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "No Authorization header"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as AuthenticatedRequest).userId = (decoded as Decode).userId;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

export { authMiddleware };