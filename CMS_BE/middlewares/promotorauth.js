// const jwt = require("jsonwebtoken");
// const pool=require('../config/databaseQuery')
// var config = require("../config/config");
// var crypto = require('crypto');
// var Store=require('../models/store.model')
// authPromotor=function(req,res,next){
   
// for (var i = 0; i < data.length; i++) {
//     // if the user location is within 100 M of the location of store  then i am enabling the user to login
//     if (distance(req.body.latitude, req.body.longitude, data[i].latitude, data[i].longitude, "K") <= 0.1) {
//         pool.poolReq.query(
//             'SELECT u.username, u.id FROM users u '+
//             'WHERE u.username = "' +
//             username +
//             '" AND BINARY u.password="' +
//             password +
//             '" AND  u.user_type="' +
//             'merchandiser' +'"',
//           function(error, results, fields) {
//             if (error) {
//               return res.json({
//                 code: 400,
//                 message: "error occured",
//                 error: error
//               });
//             } else {
//                 console.log("result is",results)
//               if (results.length > 0) {
               
//                 const username = results[0]["username"];
//                 const user = {
//                   username: username,
//                 };
//                 jwt.sign(
//                   { user },
//                  /*  "secretkey", */
//                  /* "qweqweqwe", */
//                  config.secret,
//                   { expiresIn: "300000s" },
//                   async (err, token) => {
//                     if (token !== "") {                                  
//                         return res.json({
//                           status: 200,
//                           message: "success",
//                           resultSet: {
//                             token,
//                             username,
//                           }
//                         });                  
//                     }
//                   }
//                 );
//               } else {
//                 return res.json({
//                   code: 204,
//                   message: "Email and password does not match"
//                 });
//               }
//             }
//           }
//         );
//     }else{
//         return res.json({
//             code: 204,
//             message: "You are not on Store Location!!!"
//           });

//     }
// }

// }
// function distance(lat1, lon1, lat2, lon2, unit) {
//     var radlat1 = Math.PI * lat1/180
//     var radlat2 = Math.PI * lat2/180
//     var theta = lon1-lon2
//     var radtheta = Math.PI * theta/180
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist)
//     dist = dist * 180/Math.PI
//     dist = dist * 60 * 1.1515
//     if (unit=="K") { dist = dist * 1.609344 }
//     if (unit=="N") { dist = dist * 0.8684 }
//     console.log("The distance is",dist)
//     return dist
//   }
  
// module.exports = {
//     authPromotor
//   };