require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Todos } = require("../db/db");

// create new router instance
const userRouter = Router();

// signup endpoint - create new user
userRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // find if user exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: `user with email ${email} already exists`
            })
        }

        // hash password and create user
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
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again",
            error: error.message
        })
    }
})

// signin endpoint - authenticate user
userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        // verify password
        const truePassword = await bcrypt.compare(password, user.password);
        if(!truePassword){
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        // generate token
        const payload = {
            userId: user._id,
            exp: Date.now() + 1000 * 3600
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).json({
            message: `Welcome back ${user.firstName}`,
            token: token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Login failed, please try again",
            error: error.message
        })
    }
})


module.exports = {
    userRouter
}