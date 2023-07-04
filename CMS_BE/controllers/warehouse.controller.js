const SKU = require('../models/sku.model');
const helper = require('../config/helpers');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const WareHouse = require('../models/warehouse.model');
exports.getRecords = async (req, res, next) => {
    try {
        const Data = await WareHouse.findAll({
            include: [
                {
                    model: SKU,
                    attributes: ['id'],
                }],
                where: { is_deleted: '0' }
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: Data,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.getRecordsById = async (req, res, next) => {
    try {
        const Data = await WareHouse.findAll({
            include: [
                {
                    model: SKU,
                    attributes: ['id'],
                }],
            where: { id: req.params.warehouseId, is_deleted: '0' }
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: Data
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.postRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const WareHousedetail = await WareHouse.create({            
            damage_qty: req.body.damage_qty,
            qty_warehouse: req.body.qty_warehouse,
            move_in_qty: req.body.move_in_qty,
            move_out_qty: req.body.move_out_qty,
            move_in_product_exp_date: req.body.move_in_product_exp_date,            
            image1: req.body.image1,
            image2: req.body.image2,
            sku_id: req.body.sku_id,
            customer_id:req.body.customer_id,
            promotor_id:req.body.promotor_id,
            store_id:req.body.store_id,
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

};

exports.updateRecords = async (req, res, next) => {
    try {
        const WareHousedetails = await WareHouse.update({
            damage_qty: req.body.damage_qty,
            qty_warehouse: req.body.qty_warehouse,
            move_in_qty: req.body.move_in_qty,
            move_out_qty: req.body.move_out_qty,
            move_in_product_exp_date: req.body.move_in_product_exp_date,            
            image1: req.body.image1,
            image2: req.body.image2,
            sku_id: req.body.sku_id,
            customer_id:req.body.customer_id,
            promotor_id:req.body.promotor_id,
            store_id:req.body.store_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.warehouseId } });

        if (!WareHousedetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Updated Successfully',
        });
    } catch (error) {

        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
}
exports.deleteRecords = async (req, res, next) => {

    const warehouseId = req.params.id;
    try {
        const details = await WareHouse.update({
            is_deleted: '1'
        },
            { where: { id: warehouseId } });
        if (!details) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Record Deleted Successfully',
        });
    } catch (error) {

        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Delete Record',
            status: 500

        });
    }
};