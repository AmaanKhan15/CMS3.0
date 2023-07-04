var jwt = require('jsonwebtoken');
var customId = require("custom-id");
var User_Login = require('../models/user_login.model')
var config = require("../config/config");
var createToken = async function(req) {
 console.log("In Login Token",req)
 console.log("In Login Token",req.auth.id)
    const token_id = await customId({
      user_id : req.auth.id,
      date : Date.now(),
      randomLength: 4 
    });
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress

    const user_logins=await User_Login.findAll({where:{ user_id: req.auth.id ,token_deleted:false, ip_address:ip, device: req.headers["user-agent"]}});
    user_logins.forEach(async(login) => {
      if(login){
        login.token_deleted=true;
        await login.save()
      }      
    });
    
    const token_secret=await customId({
      token_secret : ip,
      date : Date.now(),
      randomLength: 8 
    });

    const token = await User_Login.create({
      user_id : req.auth.id,
      token_id : token_id,
      token_secret : token_secret ,
      ip_address : ip ,
      device : req.headers["user-agent"]
    });

    const token_user = { id:req.auth.id , token_id: token_id  };
    const accessToken = await jwt.sign(token_user,  config.secret);
    return accessToken;
};

module.exports = {
  generateToken: async function(req, res, next) {
      var token= await createToken(req);

      const responseObject = {  auth: true,
        token: token,
        message: 'Post Created Successfully..!!'}
        console.log("Response data is",responseObject)
      return token;
    //   res.status(200).json({
    //     status: 200,
    //     message: 'Post created successfully!',
    // });
  },

//   sendToken: function(req, res) {
    
//       const responseObject = {  auth: true,
//       token: req.token,
//       message: 'Post Created Successfully..!!'}
//     return res.status(200).json(responseObject);
//   }
};
