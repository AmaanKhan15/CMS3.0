const Assignedmerchandstore = require('../../models/store.model');
const Assignedmerchand = require('../../models/assignedmerchand.model');
const StoreGroup = require('../../models/storegroup.model');
const Store = require('../../models/store.model');
const helper = require('../../config/helpers')
const AssignedSupervisor = require("../../models/merchandiser.model")
const { Op,fn, col } = require('sequelize');
const SKU = require('../../models/sku.model');
const sequelize = require('../../config/database');
const UnavailableSKU=require('../../models/unavailablesku.model')
var moment=require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const Supervisor = require("../../models/supervisor.model")

const jwt = require('jsonwebtoken');
const config=require('../../config/config')
const Blacklist= require('../../models/blacklisttoken.model');
const User_Login=require('../../models/user_login.model')
const LoginReport=require('../../models/loginrecord.model')

exports.postRecords = async (req, res, next) => {
    try {
        const AssignedStoredetail = await Assignedmerchandstore.findAll({
            where: { id: req.body.store_id, is_deleted: '0' },
            attributes: ['id', 'store_name', 'contact_no', 'address', 'latitude', 'longitude']
        });
        
        const AssignedMerchand = await AssignedSupervisor.findAll({
            where: { id: req.body.merchand_id, is_deleted: '0' },
             
            attributes: ['supervisor_id']
        });
        var supervisorId;
        AssignedMerchand.map((item)=>{
          supervisorId=item.supervisor_id;
        })
        const AssignedSupervisoretail = await Supervisor.findAll({
          where: { id:supervisorId, is_deleted: '0' },
          attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"],'id','phone_no']
      });
        var storeRecord = await StoreGroup.findAll({
            where: {
              id: req.body.store_group_id, is_deleted: '0'
            }
          })
          var stores,Totalcount,storeArr;
          var allstore=[];
          storeRecord.map((item) => {
            stores = item.store_details;
          })
           storeArr = stores.split(',');
           Totalcount=storeArr.length;
           for (i = 0; i < Totalcount; i++) {
            var AllStores = await Store.findAll({
              where: {
                id: storeArr[i],
              },
              attributes: ['id', 'store_name', 'contact_no', 'address', 'latitude', 'longitude']
            })
            allstore.push({ Store: AllStores })
          }
        if (!AssignedStoredetail || !AssignedSupervisoretail) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Fetched successfully!',
            Current_Store: AssignedStoredetail,
            Assigned_Supervisor: AssignedSupervisoretail,
            Store_Count: Totalcount,
            All_Assigned_Stores:allstore
            
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }

};
exports.postRecordsforCategory = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll        
        ({
            where: { 
                [Op.and]: [
                {store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                } }, 
                {customer_id: req.body.customer_id,
                },
            ],
            },
            attributes: ['category','id'], group: ['category']
        })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsforProduct = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll  
        ({
            where: {
                store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                },
                category: req.body.category,
                // customer_id: req.body.customer_id,
            },                        
            attributes: ['product_name','id'],group: ['product_name'],
            // attributes: ['category', 'sku'], group: ['category', 'sku']
        })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        // helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsforSKU = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll        
        ({
            
            where: {
                store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                },
                product_name: req.body.product_name,
            },
            attributes: ['sku','sku_desc','product_price','id']
        })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsskuDynamicFields = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll        
        ({
            where: {
                store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                },
                id: req.body.sku_id,
            },
            attributes: ['product_type']
        })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postSkuAvailability=async(req,res,next)=>{
    const t = await sequelize.transaction();
    try {
        const Shelfdetail = await UnavailableSKU.create({
            customer_id:req.body.customer_id,
	        store_id:req.body.store_id,
	        sku_id:req.body.sku_id,
            merchand_id:req.body.merchand_id,
	        sku_qty:0,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Shelfdetail) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    }
    catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.logoutmerchand=async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    if (!req.headers["authorization"]) {
      return res.status(401).json({
       status: 401,
       message: "You must be Authorized",
   })
  }
  const found= await Blacklist.findOne({ where: {token: token } })
  if (found){           
    jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
      const login = await User_Login.findOne({where:{ user_id : payload.id, token_id: payload.token_id}});
      login.logged_out=true;
      login.token_deleted=true;
      await login.save();
    });
    details={
      "Status":"Failure",
      "Details":'Token blacklisted Already. Cannot use this token.'
    }

    return res.status(401).json(details);
  }else {
    const auth=jwt.verify(req.headers["authorization"],  config.secret)
    const LoggedOutUsers = await LoginReport.update({
                logout_time:(moment().tz(TZ).utcOffset("+05:30").format()),
                updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            },
                { where: { user_id: auth.id} });
              const blacklist_token =await Blacklist.create({
                token:token
              });
              if(!blacklist_token || !LoggedOutUsers){
                return res.status(200).json({
                    status: 200,
                    message:"Token blacklisted. User logged out.",
                }) 
              }
  }
}