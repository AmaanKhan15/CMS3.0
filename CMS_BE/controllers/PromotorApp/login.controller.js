
const Store = require('../../models/store.model');
const User = require('../../models/users.model');
var config = require("../../config/config");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');
const Loginrecords=require("../../models/loginrecord.model")
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const Utils = require("../../utils/token.utils");
const Promotor=require('../../models/promotor.model')
const helper = require('../../config/helpers')
const AssignedSupervisor = require("../../models/promotor.model")
const { Op,fn, col } = require('sequelize');
const Supervisor = require("../../models/supervisor.model")
const Blacklist = require('../../models/blacklisttoken.model');
const User_Login = require('../../models/user_login.model')
const LoginReport = require('../../models/loginrecord.model')



exports.postRecords = async (req, res, next) => {
  var locationfind = 0;
  console.log("header is",req.connection.remoteAddress)
  console.log("header is", req.headers["user-agent"])
  try{
   const userdata=await User.findOne({
    where: {
      username: req.body.username
    }
  })
    // .then(user => {
      if (!userdata) {
        return res.status(404).send({ message: "User Name is Wrong ..!!!!" });
      }

      var hash = crypto.createHash('sha512');
      let pass = hash.update(req.body.password, 'utf-8');
      const password = pass.digest('hex');

      if (password != userdata.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: userdata.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var storeRecord= await Store.findOne({
        where: {
          id: userdata.store_id, is_deleted: '0'
        }
      })
      var count= await Store.findAndCountAll({
        where: {
          id: userdata.store_id, is_deleted: '0'
        }
      })
      let totalItems = count;            
         for(var i=0;i<totalItems.count;i++){
          if(password==userdata.password &&  req.body.username=='promotor'){
            // if the user location is within 100 M of the location of store  then i am enabling the user to login
            // if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
              locationfind = 1;
              req.auth={
                id:userdata.id,
                register:true
              }
              var Token =await Utils.generateToken(req)
              const LoginRecorddetail = await Loginrecords.create({
                user_id:userdata.id,
                login_time:(moment().tz(TZ).utcOffset("+05:30").format()),
                promotor_id:userdata.promotor_id,
                store_id:userdata.store_id,
                customer_id:userdata.customer_id,
                created_by:1,
                updated_by:1,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            })
            if(!LoginRecorddetail){
              return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
            }
              return res.status(200).json({
                status: 200,
                message: 'Logged In Succesfully',
                data: {
                  id: userdata.id,
                  username: userdata.username,
                  email: userdata.email,
                  Customer_id: userdata.customer_id,
                  Store_id: userdata.store_id,
                  Promotor_id: userdata.promotor_id,
                  accessToken: Token
                }
              })
            
            }
            else{
            //   if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
                locationfind = 1;
                req.auth={
                  id:userdata.id,
                  register:true
                }
                var Token =await Utils.generateToken(req)
                const LoginRecorddetail = await Loginrecords.create({
                  user_id:userdata.id,
                  login_time:(moment().tz(TZ).utcOffset("+05:30").format()),
                  promotor_id:userdata.promotor_id,
                  store_id:userdata.store_id,
                  customer_id:userdata.customer_id,
                  created_by:1,
                  updated_by:1,
                  created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
              })
              if(!LoginRecorddetail){
                return res.status(200).json({
                  status: 404,
                  message: 'No data found'
              })
              }
                return res.status(200).json({
                  status: 200,
                  message: 'Logged In Succesfully',
                  data: {
                    id: userdata.id,
                    username: userdata.username,
                    email: userdata.email,
                    Customer_id: userdata.customer_id,
                    Store_id: userdata.store_id,
                    Promotor_id: userdata.promotor_id,
                    accessToken: Token
                  }
                })
              }
            }
            // }
            if (locationfind == 0) {
              return res.status(500).json({
                code: 500,
                message: "You are not on Store Location!!!"
              });

            };

        // }
      }
    // })
    catch (error) {
      return res.status(500).send({ message: error.message });
    };

}
exports.getProfile=async(req,res,next)=>{
  try {
    const assignment = await Promotor.findAll({
        where: {            
            id: req.body.promotor_id,
        },
        attributes:['email','address','city','phone_no','gender','last_name','middle_name','first_name','id']       
    })
   const AssignedPromotor = await AssignedSupervisor.findAll({
            where: { id: req.body.promotor_id, is_deleted: '0' },
             
            attributes: ['supervisor_id']
        });
        var supervisorId;
        AssignedPromotor.map((item)=>{
          supervisorId=item.supervisor_id;
        })
        const AssignedSupervisoretail = await Supervisor.findAll({
          where: { id:supervisorId, is_deleted: '0' },
          attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"],'id','phone_no']
      });
    if (!assignment ) {
        return res.status(200).json({
            status: 404,
            message: 'No data found'
        })
    }
    res.status(200).json({
        status: 200,
        Promotor: assignment,
        Supeprvisor:AssignedSupervisoretail

    })
} catch (error) {
    helper.logger.info(error)
    return res.status(500).send({
        message: 'Unable to Fetch data',
        status: 500
    });
}
}
exports.getCurrentLocation=async(req,res,next)=>{
  var locationfind = 0;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0];
  if (!req.headers["authorization"]) {
      return res.status(401).json({
          status: 401,
          message: "You must be Authorized",
      })
  }
  try{
  const userdata=await User.findOne({
   where: {
     username: req.body.username
   }
 })
     if (!userdata) {
       return res.status(404).send({ message: "User Name is Wrong ..!!!!" });
     }

     var storeRecord= await Store.findOne({
       where: {
         id: userdata.store_id, is_deleted: '0'
       }
     })
     var count= await Store.findAndCountAll({
       where: {
         id: userdata.store_id, is_deleted: '0'
       }
     })
     let totalItems = count;            
        for(var i=0;i<totalItems.count;i++){
          if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            console.log("i am in onlocation list",distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K"))
            locationfind = 1;
            return res.status(200).json({
              status: 200,        
              onLocation:true,
              message:"calling from inside fun"
            })
          }
          if (locationfind == 0) {
            console.log("i am in black list",distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K"))
            Blacklist.findOne({ where: { token: token } })
        .then((found) => {
            if (found) {
                jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
                    const login = await User_Login.findOne({ where: { user_id: payload.id, token_id: payload.token_id } });
                    login.logged_out = true;
                    login.token_deleted = true;
                    await login.save();
                });
                details = {
                    "Status": 401,
                    "Details": 'Token blacklisted. Cannot use this token.'
                }
                return res.status(401).json(details);
            }
            else {
                jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
                    if (err) {
                        res.status(403).json({
                            status: 403,
                            message: "Authorization Key is Not Valid..!",
                        })
                    }
                    if (payload) {
                        const login = await User_Login.findOne({ where: { user_id: payload.id, token_id: payload.token_id } })
                        var update_user= await User_Login.update({
                            logged_out: 1,                            
                        },
                        { where: { user_id: payload.id } });
                        
                        const LoggedOutUsers = await LoginReport.update({
                            logout_time: (moment().tz(TZ).utcOffset("+05:30").format()),
                            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                        },
                        { where: { user_id: payload.id } });
                        const blacklist_token = Blacklist.create({
                            token: token
                        });
                       
                            return res.status(200).json({ status: 200,onLocation:false});
                    }
                });
            }
        });
    

          };
     }
    }
   // })
   catch (error) {
     return res.status(500).send({ message: error.message });
   };

}
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") { dist = dist * 1.609344 }
  if (unit == "N") { dist = dist * 0.8684 }
  console.log("The distance is", dist)
  return dist
}
