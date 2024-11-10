const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const JWT_SECRET = "ADD_YOUR_SECRET";
const users = [];

app.use(express.json());

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const username = jwt.verify(token, JWT_SECRET);

    if(!username) {
        return res.json({
            msg: "token is invalid"
        })
    } else {
        req.username = username;
        next();
    }
}

app.post("/signup", (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.json({
            msg: 'username or password is missing'
        })
    }

    users.push({ username: username, password: password});
    res.json({
        msg: "You're signed up"
    })
})

app.post("/signin", (req, res) => {
    const {username, password} = req.body;
    
    if(users.find(user => user.username === username) && users.find(user => user.password === password)){
        const payload = {
            username: username
        }
        const token = jwt.sign(payload, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        return res.json({
            msg: "username or password is incorrect"
        })
    }
})

app.get("/me", authMiddleware, (req, res) => {
    res.json({
        username: req.username
    })
})

app.listen(3000, () => {
    console.log("server listening on port 3000");
})