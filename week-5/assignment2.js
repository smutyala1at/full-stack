const express = require('express');
const app = express();

let reqCount = 0

function getRequestCount(req, res, next){
    reqCount += 1
    next();
}

app.use(getRequestCount);

app.get("/greet/:name", (req, res) => {
    const name = req.params.name;
    res.status(200).json({
        msg: `Hello, ${name}`
    })
})

app.get("/requestCount", (req, res) => {
    res.status(200).json({
        requestCount: reqCount
    })
})


app.listen(3000, () => {
    console.log("Server started at port", 3000);
})