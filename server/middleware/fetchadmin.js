var jwt = require('jsonwebtoken');
// const JWT_SECRET = "ThisPassword";
const User = require('../models/User');
const Admin = require('../models/AdminUser');

// const fetchadmin = async (req, res, next) => {
//   const token = req.header('auth-token');
//   if (!token) {
//     return res.status(401).send({ error: "Please authenticate using a valid token" });
//   }

//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = data.user;

//     // Check if the user's typeUser is "Admin"
//     const user = await User.findById(data.user.id);
//     if (user && user.typeUser === "Admin") {
//       // User is an admin, so proceed
//       next();
//     } else {
//       // User is not an admin, send an access denied response
//       return res.status(403).send({ error: "Access denied. You are not an admin." });
//     }
//   } catch (error) {
//     return res.status(401).send({ error: "Please authenticate using a valid token" });
//   }
// };

// added
const fetchadmin = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;

    // Check if the user's typeUser is "Admin"
    const user = await Admin.findById(data.user.id);
    if (user) {
      // User is an admin, so proceed
      next();
    } else {
      // User is not an admin, send an access denied response
      return res.status(403).send({ error: "Access denied. You are not an admin." });
    }
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchadmin;