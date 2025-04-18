const jwt = require("jsonwebtoken")
const JWT_USER_PASSWORD = require("../config.js");

function userMiddleware(req, res, next){
const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith("Bearer ")){
    
    return res.status(401).json({errors:"No token provided"});
}
const token = authHeader.split(" ")[1];
try{
    const decoded = jwt.verify(token, JWT_USER_PASSWORD)
    req.userId= decoded.id
     req.userRole = decoded.role;
    next();
}catch(error){
    return res.status(401).json({error:"Invalid token or expired"})
    console.log("Invalid token or expired token:", error)
}
}

module.exports = userMiddleware;

