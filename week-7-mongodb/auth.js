const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    const decodedUser = jwt.verify(token, JWT_SECRET);

    if(!decodedUser) {
        return res.status(403).json({
            msg: "Invalid token"
        })
    } 

    req.userId = decodedUser.id;
    next();
}


module.exports = {
    jwt,
    JWT_SECRET,
    authMiddleware
}