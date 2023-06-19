const Assignedpromotorstore = require('../../models/store.model');
const Assignedpromotor = require('../../models/promotor.model');
const Customer=require('../../models/customerdetail.model')
const helper = require('../../config/helpers')
const AssignedSupervisor = require("../../models/promotor.model")
const Supervisor = require("../../models/supervisor.model")
const Targettopromotor=require("../../models/assignTarget.model")
const AssignedPromotorSku =require("../../models/promotorskuentry.model")
const Store=require("../../models/store.model")
const { Op,fn, col } = require('sequelize');
var moment=require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const SKU = require('../../models/sku.model');
const sequelize = require('../../config/database');

exports.postRecords = async (req, res, next) => {
    try {
        const AssignedStoredetail = await Assignedpromotorstore.findAll({
            where: { id: req.body.store_id, is_deleted: '0' },
            attributes: ['id', 'store_name', 'contact_no', 'address', 'latitude', 'longitude']

        });
        // const AssignedSupervisoretail = await AssignedSupervisor.findAll({
        //     where: { id: req.body.promotor_id, is_deleted: '0' },
        //     attributes: [ [fn('concat', col('first_name'),  ' ', col('last_name')), "FullName"],'id','phone_no']
        // });
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
        const Customerdetails = await Customer.findAll({
            where: { id: req.body.Customer_id, is_deleted: '0' },
            attributes: [ [fn('concat', col('first_name'),  ' ', col('last_name')), "FullName"]]
        });
        const CurrentTarget = await Targettopromotor.findAll({
            where : {
                createdAt : { [Op.gt] : moment().format('YYYY-MM-DD 00:00')},
                createdAt : { [Op.lte] : moment().format('YYYY-MM-DD 23:59')},
                promotor_id: req.body.promotor_id
            },
            attributes:['sku_name','target_desc','target_assigned']
        })
        const count = await Assignedpromotor.findAndCountAll({ 
            where: {
                [Op.and]: [
                  { id: req.body.store_id},
                  { store_id: req.body.store_id}
                ]
              } 
         });
        let totalItems = count;
        if (!AssignedStoredetail || !AssignedSupervisoretail || !Customerdetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Fetched successfully!',
            Customer_name:Customerdetails,
            Assigned_Store: AssignedStoredetail,
            Assigned_Supervisor: AssignedSupervisoretail,
            Today_promotor_target:CurrentTarget,
            Store_Count: totalItems.count
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
                store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                },
                customer_id: req.body.customer_id,
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
        helper.logger.info(error)
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
            // where: {
            //     store_id: {
            //         [Op.like]: '%' + req.body.store_id + '%'
            //     },
            //     product_name: req.body.product_name,
            // },
            where: {
                [Op.and]: [
                  { store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                }},
                  {  product_name: req.body.product_name},
                  {  product_type: 'shelf product'},
                ]
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
exports.postRecordsNewSKU=async(req,res,next)=>{
    const t = await sequelize.transaction();
    var locationfind = 0;
    try {
        var storeRecord= await Store.findOne({
            where: {
              id: req.body.store_id, is_deleted: '0'
            }
          })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
        const allSku = await AssignedPromotorSku.create({
            sku_id:req.body.sku_id,
            customer_id:req.body.customer_id,
            store_id:req.body.store_id,
            category_id:req.body.category_id,
            sub_category_id:req.body.sub_category_id,
            shelf_qty:req.body.shelf_qty,
            total_sales_qty:req.body.total_sales_qty,
            total_amount:req.body.total_amount,
            damaged_item_qty:req.body.damaged_item_qty,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!allSku) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
    }
    if (locationfind == 0) {
        return res.status(500).json({
          code: 500,
          message: "You are not on Store Location!!!"
        });

      };
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
exports.logoutpromotor=async (req,res,next)=>{
    return res.json({message:"Token blacklisted. User logged out."});
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