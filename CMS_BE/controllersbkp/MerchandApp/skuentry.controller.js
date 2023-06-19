const helper = require('../../config/helpers')
const shelfProduct = require("../../models/shelfproduct.model")
const floorProduct = require("../../models/floorproduct.model")
const refregProduct = require("../../models/refProduct.model")
const Warehouse = require("../../models/warehouse.model")
const Store = require('../../models/store.model')
const sequelize = require('../../config/database');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const { Op } = require('sequelize');
const SKU = require('../../models/sku.model')
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
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id,
                is_deleted: '0'
            }
        })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
            const SKUupdate = await SKU.update({
                customer_id: req.body.customer_id,
                sku_id: req.body.sku_id,
                shelf_qty: req.body.shelf_qty,
                no_of_shelf: req.body.no_of_shelf,
                damage_qty: req.body.damage_qty,
                shelf_space: req.body.shelf_space,
                floor_type: req.body.floor_type,
                planogram: req.body.planogram,
                merchand_id: req.body.merchand_id,
                exp_date: req.body.exp_date,               
                updated_by: req.body.updated_by,
                updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            },
                {
                    where: { id: req.body.sku_id }
                })
            const Shelfdetail = await shelfProduct.create({
                customer_id: req.body.customer_id,
                sku_id: req.body.sku_id,
                shelf_qty: req.body.shelf_qty,
                no_of_shelf: req.body.no_of_shelf,
                damage_qty: req.body.damage_qty,
                shelf_space: req.body.shelf_space,
                floor_type: req.body.floor_type,
                planogram: req.body.planogram,
                merchand_id: req.body.merchand_id,
                exp_date: req.body.exp_date,
                customer_id: req.body.customer_id,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            }, { transaction: t })
            t.commit();
            if (!Shelfdetail && !SKUupdate) {
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
        if (locationfind === 0) {
            return res.status(500).json({
                code: 500,
                message: "You are not on Store Location!!!"
            });

        };

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
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id,
                is_deleted: '0'
            }
        })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
            const SKUupdate = await SKU.update({
                sku_id: req.body.sku_id,
                customer_id: req.body.customer_id,
                planogram: req.body.planogram,
                product_qty: req.body.product_qty,
                floor_qty: req.body.floor_qty,
                floor_type: req.body.floor_type,
                merchand_id: req.body.merchand_id,
                exp_date: req.body.exp_date,
                updated_by: req.body.updated_by,
                updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            },
                {
                    where: { id: req.body.sku_id }
                })
            const Shelfdetail = await floorProduct.create({
                sku_id: req.body.sku_id,
                customer_id: req.body.customer_id,
                planogram: req.body.planogram,
                product_qty: req.body.product_qty,
                floor_qty: req.body.floor_qty,
                floor_type: req.body.floor_type,
                merchand_id: req.body.merchand_id,
                exp_date: req.body.exp_date,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            }, { transaction: t })
            t.commit();
            if (!Shelfdetail && !SKUupdate) {
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
        if (locationfind === 0) {
            return res.status(500).json({
                code: 500,
                message: "You are not on Store Location!!!"
            });

        };

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
        var locationfind = 0;
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id,
                is_deleted: '0'
            }
        })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
            const SKUupdate = await SKU.update({
                sku_id: req.body.sku_id,
                customer_id: req.body.customer_id,
                planogram: req.body.planogram,
                product_qty: req.body.product_qty,
                ref_qty:req.body.ref_qty,
                floor_type: req.body.floor_type,
                merchand_id: req.body.merchand_id,                
                exp_date: req.body.exp_date,
                updated_by: req.body.updated_by,
                updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            },
                {
                    where: { id: req.body.sku_id }
                })
            const Shelfdetail = await refregProduct.create({
                sku_id: req.body.sku_id,
                customer_id: req.body.customer_id,
                planogram: req.body.planogram,
                product_qty: req.body.product_qty,
                floor_type: req.body.floor_type,
                ref_qty:req.body.ref_qty,
                merchand_id: req.body.merchand_id,
                exp_date: req.body.exp_date,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            }, { transaction: t })
            t.commit();
            if (!Shelfdetail && !SKUupdate) {
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
        if (locationfind === 0) {
            return res.status(500).json({
                code: 500,
                message: "You are not on Store Location!!!"
            });

        };

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
exports.postWareHouse = async (req, res, next) => {
    const t = await sequelize.transaction();
    if (req.files) {
        if (!req.files.image2) {
            console.log("I am in Image2 ")
            imageUrl2 = ""
        }
        if (!req.files.image1) {
            console.log("I am in Image1 ")
            imageUrl1 = ""
        }
        if (req.files.image1) {
            imageUrl1 = req.files.image1[0].path
        }
        if (req.files.image2) {
            imageUrl1 = req.files.image2[0].path
        }
    }
    try {
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
            customer_id: req.body.customer_id,
            merchand_id: req.body.merchand_id,
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
exports.postSubmittedSku = async (req, res, next) => {
    try {
        const WareHousedata = await Warehouse.findAll
            ({
                where: {
                    [Op.and]: [
                        { store_id: req.body.store_id },
                        { sku_id: req.body.sku_id },
                        { merchand_id: req.body.merchand_id },
                        { createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') } },
                        { createdAt: { [Op.lte]: moment().format('YYYY-MM-DD 23:59') } }
                    ]
                },
                include: [
                    {
                        model: SKU,
                        attributes: ['id', 'sku', 'sku_desc', 'category', 'product_name', 'sku_qty'],
                        required: true
                    },
                ],
                attributes: ['id', 'sku_id', 'damage_qty', 'total_sales_qty', 'total_amt', 'qty_warehouse', 'move_in_qty', 'move_out_qty', 'move_in_product_exp_date', 'createdAt']
            })

        if (!WareHousedata && !skuDetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: WareHousedata,

        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.getNearExpirayStock = async (req, res, next) => {
    try {
        const SKUdata = await SKU.findAll
            ({
                where: {
                    [Op.and]: [
                        { store_id: { [Op.like]: '%' + req.body.store_id + '%' } },
                        { customer_id: req.body.customer_id },
                        {
                            exp_date: {
                                [Op.ne]: null
                            }
                        }
                    ]
                },
                attributes: ['id', 'sku', 'exp_date']
            })
        const Storedata = await Store.findAll
            ({
                where: {
                    [Op.and]: [
                        { id:  req.body.store_id },
                        { customer_id: req.body.customer_id },
                    ]
                },
                attributes: ['id', 'store_name']
            })
        var dif = differnce(SKUdata,Storedata);
        if (!SKUdata && !Storedata) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: dif,

        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }

}
function differnce(WareHousedata,Storedata) {
    var allstore = [];
    WareHousedata.map((item) => {
        var DiffDays = getDifferenceInDays(item.exp_date);
        Storedata.map((item1)=>{
            if (DiffDays < 30 && DiffDays>0) {
                allstore.push({ expiresIn: DiffDays+" "+`Days`,sku:item.sku,exp_date:item.exp_date,store_name:item1.store_name})
            }
        })
       
    })
    return allstore;
}
function getDifferenceInDays(end) {
    const DAY_IN_MILLISECONDS = 8.64 * (10 ** 7);
  const date1 = new Date().getTime();
  const date2 = new Date(end).getTime();
  const differenceInMS = date2 - date1;
  const days = Math.floor(differenceInMS / DAY_IN_MILLISECONDS);
 return days;

}