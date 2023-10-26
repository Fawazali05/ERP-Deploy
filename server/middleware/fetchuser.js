var jwt = require('jsonwebtoken');
// const JWT_SECRET = "ThisPassword";
const User = require('../models/User')

const fetchuser = async (req, res, next)=>{
    //Get the user from jwt token and add id to req object
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
try{
    const data = jwt.verify(token,process.env.JWT_SECRET);
    req.user = data.user;
    const user = await User.findById(data.user.id);
    if (user && user.typeUser === "User") {
      // User is an admin, so proceed
      next();
    } else {
      // User is not an admin, send an access denied response
      return res.status(403).send({ error: "Access denied. You are not an admin." });
    }
}catch(error){
    res.status(401).send({error : "Please authenticate using a valid token"})
    
}

}

module.exports = fetchuser;