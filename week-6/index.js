const express = require('express');
const app = express(); // express library returns a function which we are calling here

app.use(express.json());

const users = [];

function generateToken() {
    const MIN_NUM = 48; // asci code for 0
    const MAX_NUM = 122; // asci code for lowercase z
    let string = "";

    for (let i = 0; i < 32; i++){
        const randomInt = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1) + MIN_NUM); // random number between range
        string += String.fromCharCode(randomInt);
    }

    return string;
}

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const user = users.find(user => user.token === token);
    
    if(!user) return res.send("invalid token");

    req.user = user;
    next();
}

app.post("/signup", (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({
            msg: 'username or password is missing'
        })
    } else {
        users.push({
            username: username,
            password: password
        })

        res.status(200).json({
            msg: "You're signed up"
        })
    }

    console.log(users);
})

app.post("/signin", (req, res) => {

    const {username, password} = req.body;

    const userIdx = users.findIndex((user) => user.username === username && user.password === password);

    if(userIdx == -1) {
        res.status(404).json({
            msg: 'user not found'
        })
    } else {
        const user = users[userIdx];
        const token = generateToken();
        user['token'] = token;

        res.json({
            token: token
        })
    }

    console.log(users);
})

app.get("/me", authMiddleware, (req, res) => {
    res.json({
        username: req.user.username
    })
})

app.listen(3000);