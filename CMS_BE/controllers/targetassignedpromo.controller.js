const Customer = require('../models/customerdetail.model');
const Promotor =require('../models/promotor.model')
const Targettopromotor =require('../models/assignTarget.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const sequelize = require('../config/database');
const Store = require('../models/store.model');
exports.getRecords = async (req, res, next) => {
    try {

        const Data = await Targettopromotor.findAll({
            // include: [
            //   {
            //   model: Customer,
            //   attributes: ['id', 'company_name'],
            // },
            // {
            //     model: Promotor,
            //     attributes: ['id'],
            // },
            // {
            //     model: Store,
            //     attributes: ['id'],
            // }],                
        where: {  is_deleted: '0' }
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
        const Data = await Targettopromotor.findAll({
            // include: [
            //     {
            //     model: Customer,
            //     attributes: ['id', 'company_name'],
            //   },
            //   {
            //       model: Promotor,
            //       attributes: ['id'],
            //   },
            //   {
            //       model: Store,
            //       attributes: ['id'],
            //   }],                   
            where: { id: req.params.supervisorId, is_deleted: '0' }
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
        const targetassigned = await Targettopromotor.create({
            customer_id:req.body.customer_id,
            promotor_id: req.body.promotor_id,
            store_id: req.body.store_id,
            target_achieved: req.body.target_achieved,
            target_assigned: req.body.target_assigned,
            target_desc:req.body.target_desc,
            sku_id:req.body.sku_id,
            sku_name:req.body.sku_name,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!targetassigned) {
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
    var hash = crypto.createHash('sha512');
    let data = hash.update(req.body.password, 'utf-8');
    gen_hash = data.digest('hex');
    try {
        const Supervisordetails = await Targettopromotor.update({
            customer_id:req.body.customer_id,
            promotor_id: req.body.promotor_id,
            store_id: req.body.store_id,
            target_achieved: req.body.target_achieved,
            target_assigned: req.body.target_assigned, 
            target_desc:req.body.target_desc,
            sku_id:req.body.sku_id,
            sku_name:req.body.sku_name,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.supervisorId } });

        if (!Supervisordetails) {
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

    const SupervisorId = req.params.id;
    try {
        const details = await Targettopromotor.update({
            is_deleted: '1'
        },
            { where: { id: SupervisorId } });
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