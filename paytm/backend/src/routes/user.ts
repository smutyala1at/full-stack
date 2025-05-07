import Router, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../db/db";
import { signupValidation } from "../validations/authValidation";

const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { success, error } = signupValidation.safeParse(input);

        if(!success){
            res.status(400).json({
                message: error
            })
        }

        const { firstName, lastName, email, password } = input;
        const user = await User.findOne({ email });

        if(user) {
            res.status(400).json({
                message: "User aleady exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            userId: newUser._id,
            message: "User signup successfull"
        })

    } catch (err) {
        res.status(500).json({
            message: "Error while creating a user"
        })
    }
})

userRouter.post("/signin", async (req: Request, res: Response) => {

})

export { userRouter };