const express = require("express");
const {UserModel, TodoModel} = require("./db");
const jwt = require(jwt);
const app = express();

const JWT_SECRET = "secret";

app.use(express.json());

app.post("/signup", async (req, res) => {
    
    try {
        const name = req.body.name;
        const email = req.body.username;
        const password = req.body.password;

        const user = await UserModel.create({
            name: name,
            email: email,
            password: password
        })

        res.json({
            msg: `${user.name}, you're signed up`
        })

    } catch(err) {
        return res.json({
            msg: err
        })
    } 

})


app.post("/signin", async (res, res) => {

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

app.post("/todo", (res, res) => {

})


app.get("/todos", (res, res) => {

})



