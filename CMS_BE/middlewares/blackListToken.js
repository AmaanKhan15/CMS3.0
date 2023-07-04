const jwt = require('jsonwebtoken');
const config=require('../config/config')
const Blacklist= require('../models/blacklisttoken.model');
const User_Login=require('../models/user_login.model')
const LoginReport=require('../models/loginrecord.model')
var moment=require("moment");
const TZ = moment.tz("Asia/Kolkata").format();

function blacklistToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    if (!req.headers["authorization"]) {
      return res.status(401).json({
       status: 401,
       message: "You must be Authorized",
   })
  }
    Blacklist.findOne({ where: {token: token } })
    .then((found) => {
      if (found){        
        jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
          const login = await User_Login.findOne({where:{ user_id : payload.id, token_id: payload.token_id}});
          login.logged_out=true;
          login.token_deleted=true;
          await login.save();
        });
        details={
          "Status":"Failure",
          "Details":'Token blacklisted. Cannot use this token.'
        }

        return res.status(401).json(details);
      }
      else {
        jwt.verify(req.headers["authorization"],  config.secret, async (err, payload) => {
            if (err){
                res.status(403).json({
                    status: 403,
                    message: "Authorization Key is Not Valid..!",
                }) 
                } 
          if(payload){ 
            // console.log("payload id is",payload.id)
            const login = await User_Login.findOne({where:{ user_id : payload.id, token_id: payload.token_id}})
            // if(login.token_deleted==true){
            //   login.logged_out=true;
            //   await login.save()
              const LoggedOutUsers = await LoginReport.update({
                logout_time:(moment().tz(TZ).utcOffset("+05:30").format()),
                updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            },
                { where: { user_id: payload.id} });
              const blacklist_token = Blacklist.create({
                token:token
              });
            // }
            // else{
            //   login.logged_out=true;
            //   login.token_deleted=true;
            //   await login.save();
            //   const LoggedOutUsers = await LoginReport.update({
            //     logout_time:(moment().tz(TZ).utcOffset("+05:30").format()),
            //     updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            // },
            //     { where: { user_id: payload.id } });
            //   const blacklist_token = Blacklist.create({
            //     token:token
            //   });
            // }
          }
          next();
        });
      }
    });
}

module.exports = blacklistToken
