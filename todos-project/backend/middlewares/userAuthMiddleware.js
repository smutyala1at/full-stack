
const jwt = require("jsonwebtoken");

function userAuthMiddleware(req, res, next) {
    try {
        // get bearer token from headers
        const token = req.headers.authorization.split(" ")[1];
        let decoded;

        if(!token){
            return res.status(401).json({ 
                message: "Unauthorized access" 
            })
        }

        // verify token
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.exp < Date.now()){
            return res.status(401).json({
                message: "Token expired, please sign in to receive new token"
            })
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        const errMessage = error.name === "JsonWebTokenError" ? "Unauthorized access - Invalid token" : error.message;

        return res.status(401).json({
            message: errMessage
        });
    }
}

module.exports = {
    userAuthMiddleware
}