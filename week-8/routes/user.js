const {Router} = require("express");
const {userSchemaValidation} = require("../schemaValidation/userSchemaValidation");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const {success, error} = userSchemaValidation.safeParse(req.body);
    
    // early return if validation fails
    if(!success){
        const errors = [];
        error.issues.forEach(issue => errors.push(issue.message));
        return res.json({
            msg: errors
        })
    }

    // 

    


}) 

userRouter.post("/login", async (req, res) => {
    
}) 

userRouter.get("/purchases", async (req, res) => {

})


module.exports = {
    userRouter
}