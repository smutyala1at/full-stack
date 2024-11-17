const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization;
        let decoded;
        if(req.baseUrl === "/user"){
            decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
        } else {
            decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        }

        if(decoded.exp > Date.now()) {
            return res.json({
                msg: "Token expired, please sign in to receieve new token"
            })
        }

        req.userId = decoded.userId;
        next()

    } catch(err){
        let errMessage = err.message;

        if(err.name === "JsonWebTokenError"){
            errMessage = "Invalid token"
        }
        return res.json({
            msg: errMessage
        })
    }
}

module.exports = {
    authMiddleware
}