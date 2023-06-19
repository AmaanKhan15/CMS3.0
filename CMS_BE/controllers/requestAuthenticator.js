var jwt = require("jsonwebtoken");
var config = require("../config/config");

module.exports = (req, res, next) => {
  
  if (!req.headers["authorization"]) {
   return res.status(401).json({
    status: 401,
    message: "You must be Authorized",
})
  } else {
    jwt.verify(req.headers["authorization"], config.secret, (err, decoded) => {
      if (err) {
        res.status(403).json({
          status: 403,
          message: "Authorization Key is Not Valid..!",
      })
      } else {
        next();
      }
    });
  }
};