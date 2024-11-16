const {Router} = require("express");
const bcrypt = require("bcrypt");
const adminRouter = Router();
const {Admin, Course} = require("../db/db")
const {SignupSchemaValidation, SigninSchemaValidation} = require("../schemaValidation/userSchemaValidation");

adminRouter.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const {success, error} = SignupSchemaValidation.safeParse(req.body);

    // early return if validation fails
    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));
        return res.json({
            errors
        })
    }

    // early return if the user already exists
    const existingUser = await Admin.findOne({
        email: email
    })

    if(existingUser){
        return res.json({
            msg: "user with this email already exists"
        })
    }

    // hash the password and store the user in the DB
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
    })

    res.json({
        msg: `${firstName}, you're signed up as an admin`
    })


}) 

adminRouter.post("/login", async (req, res) => {
    
}) 

adminRouter.post("/course", async (req, res) => {
    
}) 

adminRouter.put("/course", async (req, res) => {
    
}) 

adminRouter.get("/course/bulk", async (req, res) => {
    
}) 

module.exports = {
    adminRouter
}