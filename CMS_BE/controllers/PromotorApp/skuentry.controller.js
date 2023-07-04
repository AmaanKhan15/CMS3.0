const helper = require('../../config/helpers')
const shelfProduct = require("../../models/shelfproduct.model")
const floorProduct = require("../../models/floorproduct.model")
const refregProduct = require("../../models/refregproduct.model")
const Warehouse = require("../../models/warehouse.model")
const sequelize = require('../../config/database');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const { Op } = require('sequelize');
const Store =require('../../models/store.model')
const AssignedPromotorSku = require("../../models/promotorskuentry.model")

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
    // console.log("The distance is", dist)
    return dist
  }
  
exports.postRecordsShelfProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    var locationfind = 0;

    try {
        var storeRecord= await Store.findOne({
            where: {
              id: req.body.store_id,
              is_deleted: '0'
            }
          })
        // if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
console.log("Location Update is",locationfind)
        const Shelfdetail = await shelfProduct.create({
            customer_id:req.body.customer_id,
            store_id:req.body.store_id,
            sku_id:req.body.sku_id,
            shelf_qty:req.body.shelf_qty,
            no_of_shelf:req.body.no_of_shelf,
            damage_qty:req.body.damage_qty,
            shelf_space:req.body.shelf_space,
            floor_type:req.body.floor_type,
            planogram:req.body.planogram,
            customer_id:req.body.customer_id,
            exp_date:req.body.exp_date,
	        promotor_id:req.body.promotor_id,
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

    // }
    // if (locationfind === 0) {
    //     return res.status(500).json({
    //       code: 500,
    //       message: "You are not on Store Location!!!"
    //     });

    //   };       
       
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
exports.postRecordsFloorProduct = async (req, res, next) => {
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
        const Shelfdetail = await floorProduct.create({
            sku_id:req.body.sku_id,
            store_id:req.body.store_id,
            planogram:req.body.planogram,
            product_qty:req.body.product_qty,
            floor_type:req.body.floor_type,
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
exports.postRecordsRefrigeratorProduct = async (req, res, next) => {
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
        const Shelfdetail = await refregProduct.create({
            sku_id:req.body.sku_id,
            store_id:req.body.store_id,
            planogram:req.body.planogram,
            product_qty:req.body.product_qty,
            floor_type:req.body.floor_type,
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
exports.postWareHouse=async(req,res,next)=>{
    const t = await sequelize.transaction();
    var locationfind = 0;
    if (req.files) {
        // console.log("Image 1 is",req.files.image1.path)
        imageUrl1=req.files.image1[0].path
        imageUrl2= req.files.image2[0].path
    }
    try {
        var storeRecord= await Store.findOne({
            where: {
              id: req.body.store_id, is_deleted: '0'
            }
          })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
        const WareHousedetail = await Warehouse.create({            
            damage_qty: req.body.damage_qty,
            qty_warehouse: req.body.qty_warehouse,
            move_in_qty: req.body.move_in_qty,
            move_out_qty: req.body.move_out_qty,
            move_in_product_exp_date: req.body.move_in_product_exp_date,
            image1: imageUrl1,
            image2: imageUrl2,
            sku_id: req.body.sku_id,
            store_id: req.body.store_id,
            promotor_id: req.body.promotor_id,
            customer_id:req.body.customer_id,
            total_amt: req.body.total_amt,
            total_sales_qty: req.body.total_sales_qty,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!WareHousedetail) {
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
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }


}
exports.postImages=async(req,res,next)=>{
    const t = await sequelize.transaction();
    var imageUrl1;
    var imageUrl2;
    var locationfind = 0;
    if (req.files) {
        // console.log("Image 1 is",req.files.image1.path)
        imageUrl1=req.files.image1[0].path
        imageUrl2= req.files.image2[0].path
    }
    try {
        var storeRecord= await Store.findOne({
            where: {
              id: req.body.store_id, is_deleted: '0'
            }
          })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
        const WareHousedetail = await Warehouse.create({            
            image1: imageUrl1,
            image2: imageUrl2,
            sku_id: req.body.sku_id,
            store_id: req.body.store_id,
            promotor_id: req.body.promotor_id,
            customer_id:req.body.customer_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        console.log("Warehouse images ",WareHousedetail)
        t.commit();
        if (!WareHousedetail) {
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
    } catch (error) {
        t.rollback();
        // helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }

}
exports.postSubmittedSku = async (req, res, next) => {
    try {
        const WareHousedata = await AssignedPromotorSku.findAll        
        ({
            // where: {
            //     store_id:  req.body.store_id ,
            //     sku_id: req.body.sku_id,
            //     promotor_id: req.body.promotor_id,
            //     [Op.and]: [
            //         sequelize.where(sequelize.fn('date', sequelize.col('created_on')), '=', req.body.date)                    
            //     ]
            // },
            where: {
                [Op.and]: [
                    { store_id: req.body.store_id },
                    { customer_id: req.body.customer_id },
                    { promotor_id: req.body.promotor_id },
                    { createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') } },
                    { createdAt: { [Op.lte]: moment().format('YYYY-MM-DD 23:59') } }
                    
                ]
            },
        })
        if (!WareHousedata) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: WareHousedata
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }}

