
const StoreGroup = require('../../models/storegroup.model');
const Store = require('../../models/store.model');
const User = require('../../models/users.model');
var config = require("../../config/config");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');
const Loginrecords=require("../../models/loginrecord.model")
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const Utils = require("../../utils/token.utils");
const Salesman=require('../../models/salesman.model')
const helper = require('../../config/helpers')
const AssignedSupervisor = require("../../models/salesman.model")
const { Op,fn, col } = require('sequelize');
const Supervisor = require("../../models/supervisor.model")

exports.postRecords = async (req, res, next) => {
  var locationfind = 0;
  try {
    const userdata = await User.findOne({
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

    // var token = jwt.sign({ id: userdata.id }, config.secret, {
    //   expiresIn: 86400 // 24 hours
    // });
console.log("storegroup id is",userdata.storegroup_id)
    var storeRecord = await StoreGroup.findAll({
      where: {
        id: userdata.storegroup_id, is_deleted: '0'
      }
    })
    var stores, store_detail;
    var allstore = [];
    var alllocations = [];
    storeRecord.map((item) => {
      stores = item.store_details;
    })
    var storeArr = stores.split(',');
    for (i = 0; i < storeArr.length; i++) {
      var count = await Store.findAll({
        where: {
          id: storeArr[i],
        }
      })
      allstore.push({ data: count })
    }
    allstore.map((item, key) => {
      store_detail = item.data;
      store_detail.map((item1, key) => {
        alllocations.push({ latitude: item1.latitude, longitude: item1.longitude ,store_id:item1.id})
      })
    })

    for (var i = 0; i < alllocations.length; i++) {     
        // if the user location is within 100 M of the location of store  then i am enabling the user to login
        if (distance(req.body.latitude, req.body.longitude, alllocations[i].latitude, alllocations[i].longitude, "K") <= 1.100) {

          locationfind = 1;
          req.auth={
            id:userdata.id,
            register:true
          }
          var Token =await Utils.generateToken(req)
  
          const LoginRecorddetail = await Loginrecords.create({
            user_id:userdata.id,
            login_time:(moment().tz(TZ).utcOffset("+05:30").format()),
            Salesman_id:userdata.Salesman_id,
            store_group_id:userdata.storegroup_id,
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
              Store_id: alllocations[i].store_id,
              storegroup_id: userdata.storegroup_id,
              Salesman_id: userdata.Salesman_id,
              accessToken: Token
            }
          })
        }

      }
    if (locationfind == 0) {
      return res.status(500).json({
        code: 500,
        message: "You are not on One of Store Assigned!!!"
      });

    };
  }
  // })
  catch (error) {
    res.status(500).send({ message: error.message });
  };

}
exports.getProfile=async(req,res,next)=>{
  try {
    const assignment = await Salesman.findAll({
        where: {            
            id: req.body.salesman_id,
        },
        attributes:['email','address','city','phone_no','gender','last_name','middle_name','first_name','id']       
    })
  //  const AssignedPromotor = await AssignedSupervisor.findAll({
  //           where: { id: req.body.salesman_id, is_deleted: '0' },
             
  //           attributes: ['supervisor_id']
  //       });
  //       var supervisorId;
  //       AssignedPromotor.map((item)=>{
  //         supervisorId=item.supervisor_id;
  //       })
  //       const AssignedSupervisoretail = await Supervisor.findAll({
  //         where: { id:supervisorId, is_deleted: '0' },
  //         attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"],'id','phone_no']
  //     });
    if (!assignment ) {
        return res.status(200).json({
            status: 404,
            message: 'No data found'
        })
    }
    res.status(200).json({
        status: 200,
        Salesman: assignment,
        // Supeprvisor:AssignedSupervisoretail
    })
} catch (error) {
    helper.logger.info(error)
    return res.status(500).send({
        message: 'Unable to Fetch data',
        status: 500
    });
}
}
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  console.log("distance from data is",dist)
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
