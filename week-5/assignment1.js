const express = require('express');
const app = express();

app.use(express.json());

function getReqMetadata(req, res, next){
    console.log(`The request http method is ${req.method}`);
    console.log(`The request url is ${req.hostname}`);
    console.log(`The request timestamp is ${new Date().toLocaleString()}`);
    next();
}

app.get('/metadata', getReqMetadata, (req,res) => {
    res.status(200).json({
        msg: 'request metadata is logged successfully'
    })
})

app.listen(3000);