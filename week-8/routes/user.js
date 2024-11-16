const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SignupSchemaValidation, SigninSchemaValidation} = require("../schemaValidation/userSchemaValidation");
const { User, Course, Purchase } = require("../db/db");

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

userRouter.get("/course/bulk", async (req, res) => {
    try{
        const courses = await Course.find()
        const result = [];

        courses.forEach(course => result.push({
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl || null
        }))

        return res.json({
            courses: result
        })
    } catch(err){
        res.json({
            err
        })
    }
}) 

userRouter.post("/course/purchase", async (req, res) => {
    try{
        const {courseId} = req.body;

        const isValid = await Course.findOne({
            courseId: courseId
        })

        if(isValid){
            const purchasedCourse = await Purchase.create({
                userId: req.userId,
                courseId: courseId
            })

            res.json({
                msg: "Your purchase is successful"
            })
        } else{
            return res.json({
                msg: "Course is not available"
            })
        }
    } catch(err){
        return res.json({
            msg: err.message
        })
    }
})

userRouter.get("/purchases", async (req, res) => {
    try{
        const userCourses = await Purchase.findById(req.userId);
        return res.json({
            userCourses
        })
    } catch(err){
        return res.json({
            msg: err.message
        })
    }
})


module.exports = {
    userRouter
}