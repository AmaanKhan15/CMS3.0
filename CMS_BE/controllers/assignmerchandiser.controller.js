
const AssignedMerchand=require('../models/assignedmerchand.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Customer = require('../models/customerdetail.model');
const Promotor = require('../models/merchandiser.model');
const User =require('../models/users.model')
exports.getRecords = async (req, res, next) => {
    try {
        const Data = await AssignedMerchand.findAll({
            include: [
                {
                model: Customer,
              },{
                model: Promotor,
              }],                
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
        const Data = await AssignedMerchand.findAll({
            include: [
                {
                model: Customer,
              },{
                model: Promotor,
              }],
            where: { id: req.params.assignedmerchandId, is_deleted: '0' }
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
        const users=await User.update({
            merchand_id:req.body.merchand_id
        },{where: { username: req.body.username } });
        
        const AssignedMerchanddetail = await AssignedMerchand.create({
            merchand_id:req.body.merchand_id,
            customer_id:req.body.customer_id,
            store_group_id:req.body.store_group_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!AssignedMerchanddetail && !users) {
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
        
        const AssignedMerchanddetails = await AssignedMerchand.update({
            merchand_id:req.body.merchand_id,
            customer_id:req.body.customer_id,
            store_group_id:req.body.store_group_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.assignedmerchandId } });

        if (!AssignedMerchanddetails ) {
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

    const assignedmerchandId = req.params.id;
    try {
        const details = await AssignedMerchand.update({
            is_deleted: '1'
        },
            { where: { id: assignedmerchandId } });
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