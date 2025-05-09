import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/db";
import { signinValidation, signupValidation } from "../validations/authValidation";
import { formatErrors } from "../utils/utils";
import { updateUserValidation } from "../validations/userValidation";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response): Promise<any> => {
    try {
        const input = req.body;
        const { success, error } = signupValidation.safeParse(input);

        if(!success){
            return res.status(400).json({
                errors: formatErrors(error)
            })
        }

        const { firstName, lastName, email, password } = input;
        const user = await User.findOne({ email });

        if(user) {
            return res.status(409).json({
                errors: "User aleady exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            userId: newUser._id,
            message: "User signup successfull"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error while creating a user"
        });
    }
})

userRouter.post("/signin", async (req: Request, res: Response): Promise<any> => {
    try{
        const input = req.body;
        const { success, error } = signinValidation.safeParse(input);

        if(!success) {
            return res.status(400).json({
                errors: formatErrors(error)
            })
        }

        const { email, password } = input;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: "User not found this email"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const payload = {
            userId: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h"})

        return res.status(200).json({
            token
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

userRouter.put("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const input = req.body;
        const { success, error } = updateUserValidation.safeParse(input);

        if(!success) {
            return res.status(400).json({
                errors: formatErrors(error)
            });
        }

        const userId = req.userId;
        await User.findByIdAndUpdate(
            userId,
            input
        )

        return res.status(200).json({
            message: "User updated successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})


userRouter.get("/bulk", async (req: Request, res: Response): Promise<any> => {
    try {
        const filter = (req.query.filter as string)?.trim();

        const users = await User.find({
            "$or": [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
            ]
        });

        return res.status(200).json({
            users: users.map(({_id, firstName, lastName}) => ({
                _id, 
                firstName, 
                lastName
            }))
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

export { userRouter };