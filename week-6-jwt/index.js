const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const JWT_SECRET = "ADD_YOUR_SECRET";
const users = [];

app.use(express.json());
app.use(cors());

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            msg: "jwt must be provided"
        })
    }   

    const decodedInformation = jwt.verify(token, JWT_SECRET);

    if(!decodedInformation) {
        return res.json({
            msg: "token is invalid"
        })
    } else {
        req.username = decodedInformation.username;
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

    const user = users.find(user => user.username === username);
    if(user) {
        return res.json({
            msg: 'user already exists with this username'
        })
    } else {
        users.push({ username: username, password: password});
        res.json({
            msg: "You're signed up"
        })
    }
})

app.post("/signin", (req, res) => {
    const {username, password} = req.body;
    
    if(users.find(user => user.username === username) && users.find(user => user.password === password)){
        const payload = {
            username: username
        }
        const token = jwt.sign(payload, JWT_SECRET);

        res.json({
            token: token,
            msg: "You're signed in"
        })
    } else {
        return res.json({
            msg: "username or password is incorrect"
        })
    }
})

app.get("/me", authMiddleware, (req, res) => {

    const user = users.find(user => user.username === req.username)

    if (user) {
        res.json({
            username: user.username
        })
    }
})

app.delete("/logout", authMiddleware, (req, res) => {

    const userIdx = users.findIndex(user => user.username === req.username);
    users.splice(userIdx, 1);

    res.json({
        msg: "user is deleted"
    })
})

app.listen(3000, () => {
    console.log("server listening on port 3000");
})