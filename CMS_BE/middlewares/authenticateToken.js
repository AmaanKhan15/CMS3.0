const jwt = require('jsonwebtoken');
const Blacklist= require('../models/blacklisttoken.model');
const User_Login=require('../models/user_login.model')
const config=require('../config/config')
//MIDDLEWARE TO AUTHENTICTAE TOKEN BEFORE ACCESSING PROTECTED ROUTES
// async function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   console.log("In authorization headers are ",req.headers)
//   console.log("In authorization headers are ",req.headers['authorization'])
//   const token = authHeader && authHeader.split(' ')[0];
//   if (!req.headers["authorization"]) {
//     return res.status(401).json({      
//      status: 401,
//      message: "You must be Authorized",
//  })
// }
// Blacklist.findOne({ where: {token: token } })
//       .then((found) => {
//         console.log("this",found)

//         if (found){
//           details={
//             "Status":"Failure",
//             "Details":'Token blacklisted. Cannot use this token.'
//           }

//           return res.status(401).json(details);
//         }
//         else {
           
//           jwt.verify(req.headers["authorization"],  config.secret, async (err, payload) => {
//             if (err){
//             res.status(403).json({
//                 status: 403,
//                 message: "Authorization Key is Not Valid..!",
//             }) 
//             }           
//             if(payload){
//               const login = await User_Login.findOne({where:{ user_id : payload.id, token_id: payload.token_id}})
//               if(login.token_deleted==true){
//                 const blacklist_token = Blacklist.create({
//                   token:token
//                 });
//                 return res.sendStatus(401)
//               }
//             }
//             req.user = payload;
//             next();
//           }); 
//         }  
//       });
// }

async function authenticateToken(req, res, next) { 
  if (!req.headers["authorization"]) {
    return res.status(401).send("Unauthorized");
  } else {
    jwt.verify(req.headers["authorization"], config.secret, (err, decoded) => {
      if (err) {
        res.status(403).send("NOt authorized");
      } else {
        next();
      }
    });
  }
};
module.exports = authenticateToken
