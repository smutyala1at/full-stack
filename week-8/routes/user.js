const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SignupSchemaValidation, SigninSchemaValidation} = require("../schemaValidation/userSchemaValidation");
const { User } = require("../db/db");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const {success, error} = SignupSchemaValidation.safeParse(req.body);
    
    // early return if validation fails
    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));
        return res.json({
            msg: errors
        })
    }

    // early return if the user already exists
    const existingUser = await User.findOne({email: email})
    console.log(existingUser)
    if(existingUser) {
        return res.json({
            msg: `User with ${email} already exists`
        })
    }


    // else create a user in the database
    const hashedpassword = await bcrypt.hash(password, 5);
    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedpassword
    })

    res.status(200).json({
        msg: `${firstName}, you're signed up`
    })

}) 

userRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const {success, error} = SigninSchemaValidation.safeParse(req.body);

    // early return if the validation fails
    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));

        return res.json({
            msg: errors
        })
    }

    // early return if the user doesn't exists
    const user = await User.findOne({
        email: email,
    })

    if(!user){
        return res.status(403).json({
            msg: "user doesn't exists"
        })
    }

    const istrueCredentials = await bcrypt.compare(password, user.password);

        // return if the credentials are wrong
        if(!istrueCredentials){
            return res.status(403).json({
                msg: "Incorrect credentials"
            })
        }

        const payload = {
            userId: user._id,
            exp: Date.now() + 3600 
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            token: token
        })
}) 

userRouter.get("/purchases", async (req, res) => {

})


module.exports = {
    userRouter
}