const SKU = require('../models/sku.model');
const helper = require('../config/helpers');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Shelfproduct = require('../models/warehouse.model');
exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Shelfproduct.findAll({
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
        const Data = await Shelfproduct.findAll({
            include: [
                {
                    model: SKU,
                    attributes: ['id'],
                }],
            where: { id: req.params.shelfproductId, is_deleted: '0' }
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
        const Shelfproductdetail = await Shelfproduct.create({
            shelf_qty: req.body.shelf_qty,
            no_of_shelf: req.body.no_of_shelf,
            damage_qty: req.body.damage_qty,
            shelf_space: req.body.shelf_space,
            floor_type: req.body.floor_type,
            planogram: req.body.planogram,
            sku_id: req.body.sku_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Shelfproductdetail) {
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
        const Shelfproductdetails = await Shelfproduct.update({
            shelf_qty: req.body.shelf_qty,
            no_of_shelf: req.body.no_of_shelf,
            damage_qty: req.body.damage_qty,
            shelf_space: req.body.shelf_space,
            floor_type: req.body.floor_type,
            planogram: req.body.planogram,
            sku_id: req.body.sku_id,            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.ShelfproductId } });

        if (!Shelfproductdetails) {
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

    const ShelfproductId = req.params.id;
    try {
        const details = await Shelfproduct.update({
            is_deleted: '1'
        },
            { where: { id: ShelfproductId } });
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