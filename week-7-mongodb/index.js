const express = require("express");
const {UserModel, TodoModel} = require("./db");
const {jwt, JWT_SECRET, authMiddleware} = require("./auth")
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.insert({
            name: name,
            email: email,
            password: password
        })

        res.json({
            msg: `${user.name}, You're signed up`
        })

    } catch(err) {
        return res.json({
            msg: err
        })
    } 

})


app.post("/signin", async (req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({
            email: email,
            password: password
        })

        if(user) {
            const token = jwt.sign({id: user._id}, JWT_SECRET);
            res.json({
                token: token
            })
        } else {
            return res.status(403).json({
                msg: "Incorrect credentials"
            })
        }
    } catch(err){
        return res.json({
            msg: err
        })
    }
})

app.post("/todo", authMiddleware, async (req, res) => {

    try{
        const title = req.body.title;
        const done = false;

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
            msg: err
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
