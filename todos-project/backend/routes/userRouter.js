const { Router } = require("express");
const { User, Todos } = require("../db/db");


const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const user = User.findOne({ email: email });

    if (user) {
        return res.status(400).json({
            message: "user already exists with this email";
        })
    }
})