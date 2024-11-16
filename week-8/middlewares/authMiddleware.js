const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.exp > Date.now()) {
            return res.json({
                msg: "Token expired, please sign in to receieve new token"
            })
        }

        req.userId = decoded.userId;
        next()

    } catch(err){
        return res.json({
            msg: err.message
        })
    }
}

module.exports = {
    authMiddleware
}