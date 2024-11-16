const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const {Admin, Course} = require("../db/db")
const {SignupSchemaValidation, SigninSchemaValidation} = require("../schemaValidation/userSchemaValidation");
const {authMiddleware} = require("../middlewares/authMiddleware");
const { newCourseValidation, updateCourseValidation } = require("../schemaValidation/coursesSchemaValidation");

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
    const user = await Admin.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    })

    res.json({
        msg: `${firstName}, you're signed up as an admin`
    })


}) 

adminRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const {success, error} = SigninSchemaValidation.safeParse(req.body);

    // early return if the validation fails
    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));
        return res.json({
            errors
        })
    }

    // early return if credentials are incorrect
    const user = await Admin.findOne({
        email: email
    })

    if(!user) {
        return res.status(403).json({
            msg: "user doesn't exists"
        })
    }

    const istrueCredentials = await bcrypt.compare(password, user.password);

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

    res.status(200).json({
        token: token
    })
}) 

adminRouter.get("/course/bulk", async (req, res) => {
    
}) 

adminRouter.use(authMiddleware);

adminRouter.post("/course", async (req, res) => {
    try {
        const {title, description, price, imageUrl} = req.body;
        const {success, error} = newCourseValidation.safeParse(req.body);

        if(!success){
            const errors = [];
            error.issues.forEach(issue => errors.push(issue.message));
            return res.json({
                errors
            })
        }
        // early return if the course with same creatorId exists in DB
        const existingCourse = await Course.findOne({
            title: title,
            creatorId: req.userId
        })

        if(existingCourse){
            return res.json({
                msg: "Course already exists in your courses"
            })
        }

        const course = await Course.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: req.userId
        })

        res.status(200).json({
            msg: "Course has been created"
        })
    } catch(err){
        return res.json({
            msg: err.message
        })
    }
    

}) 

adminRouter.put("/course", async (req, res) => {
    const {courseId, title, description, price, imageUrl} = req.body;
    const {success, error} = updateCourseValidation.safeParse(req.body);

    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));
        return res.json({
            errors
        })
    }

    // early return if the course doesn't exists with creatorId
    const course = await Course.findOne({
        _id: courseId,
        creatorId: req.userId
    })

    if(!course){
        return res.json({
            msg: "You don't have enough rights to update this course"
        })
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
        title, description, price, imageUrl
    })

    res.status(200).json({
        msg: "Course details are updated"
    })
}) 



module.exports = {
    adminRouter
}