const express = require("express");
const bcrypt = require("bcrypt");
const {UserModel, TodoModel} = require("./db");
const {jwt, JWT_SECRET, authMiddleware} = require("./auth")
const {signupSchema} = require("./inputValidation")
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const {success, data, error} = signupSchema.safeParse(req.body);

    try {
        if (success) {
            const {name, email, password} = data;
            const hashedPassword = await bcrypt.hash(password, 5);

            const user = await UserModel.create({
                name: name,
                email: email,
                password: hashedPassword
            })

            res.json({
                msg: `${name}, You're signed up`
            })

        } else {
            const errors = []
            if (error.issues.length > 1) {
                error.issues.forEach(issue => errors.push(issue.message))
                return res.json({
                    errors
                })
            }
            
            return res.json({
                msg: error.issues[0].message
            })
        }
        
    } catch(err) {
        return res.json({
            msg: err.message
        })
    } 

})


app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    try{
        const user = await UserModel.findOne({
            email: email,
        })

        if(user) {    
            const istrueCredentials = await bcrypt.compare(password, user.password);

            if(!istrueCredentials) return res.status(403).json({
                msg: "Incorrect credentials"
            })

            const token = jwt.sign({id: user._id}, JWT_SECRET);
            res.json({
                token: token
            })
        } else {
            return res.status(403).json({
                msg: "user doesn't exists"
            })
        }
    } catch(err){
        return res.json({
            msg: err.message
        })
    }
})

app.post("/todo", authMiddleware, async (req, res) => {
    const title = req.body.title;
    const done = false;

    try{
        const todo = await TodoModel.create({
            userId: req.userId,
            title: title,
            done: done
        })


        res.status(200).json({
            msg: "todo created"
        })

    } catch(err) {
        return res.status(500).json({
            msg: err.message
        })
    }
})


app.get("/todos", authMiddleware, async (req, res) => {
    
    try {
        const todos = await TodoModel.find({
            userId: req.userId
        })

        res.status(200).json({
            todos: todos
        })
    } catch(err) {
        res.status(500).json({
            msg: err
        })
    }
})


app.listen(3000);
