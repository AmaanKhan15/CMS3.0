const jwt = require("jsonwebtoken");
const pool=require('../config/databaseQuery')
var config = require("../config/config");
var crypto = require('crypto');
const Utils = require("../utils/token.utils");
var User=require('../models/users.model')
allUser=async function(req,res,next){
  const all = await User.findAll({
    attributes:['username','id','user_type','password','email']
  });
  // if(!all){
    return res.json({
      status: 200,
      message: "success",
      data:all 
    }); 

  // }
}
authUser = async function(req, res, next) {
  const username = req.body.username;
  var hash = crypto.createHash('sha512');
  let data = hash.update(req.body.password, 'utf-8');
  const Userpassword  = data.digest('hex');

  if (
    typeof username == "undefined" ||
    username == "" ||
    typeof Userpassword == "undefined" ||
    Userpassword == ""
  ) {
    return res.json({
      code: 204,
      message: "Please send username and password"
    });
  } 
  const userexists = await User.findOne({ where: {username: username  } ,attributes:['username','id','user_type']});
  if (!userexists)
    return res.status(401).send('Username or password is wrong');

  //check password
  const validPass = await User.findOne({ where: {password: Userpassword } });
  if (!validPass)
    return res.status(403).send('Password is incorrect');

  req.user=userexists
  req.auth={
    id:req.user.id,
    register:false
  }
  var Token =await Utils.generateToken(req);
  return res.json({
                          status: 200,
                          message: "success",
                          resultSet: {
                            Token,
                            userexists,
                          }
                        }); 

}
module.exports = {
  authUser,
  allUser
};
