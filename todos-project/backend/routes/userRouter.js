const { Router } = require("express");
const bcrypt = require("bcrypt");
const { User, Todos } = require("../db/db");


const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const user = User.findOne({ email: email });

    if (user) {
        return res.status(400).json({
            message: `user with email ${email} already exists`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    })

    res.status(201).json({
        messaage: `${firstName}, you're succesfully signed up`
    })
})