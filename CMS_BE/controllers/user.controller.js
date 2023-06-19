const Customer = require('../models/customerdetail.model');
const Promotor =require('../models/promotor.model')
const Merchand =require('../models/merchandiser.model')
const Supervisor =require('../models/supervisor.model')
const Users =require('../models/users.model')
const Store  =require('../models/store.model')
const StoreGroup  =require('../models/storegroup.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const sequelize = require('../config/database');
exports.getRecords = async (req, res, next) => {
    try {

        const Data = await Users.findAll({
            include: [
              {
              model: Customer,
              attributes: ['id', 'company_name'],
            },
            {
                model: Promotor,
                attributes: ['id'],
            },
            {
                model: Merchand,
                attributes: ['id'],
            },
            {
                model: Store,
                attributes: ['id'],
            },
            {
                model: StoreGroup,
                attributes: ['id'],
            },
            {
                model: Supervisor,
                attributes: ['id'],
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
        const Data = await Users.findAll({
            include: [
                {
                model: Customer,
                attributes: ['id', 'company_name'],
              },
              {
                  model: Promotor,
                  attributes: ['id'],
              },
              {
                  model: Merchand,
                  attributes: ['id'],
              },
              {
                  model: Store,
                  attributes: ['id'],
              },
              {
                  model: StoreGroup,
                  attributes: ['id'],
              },
              {
                  model: Supervisor,
                  attributes: ['id'],
              }],                  
            where: { id: req.params.usersId, is_deleted: '0' }
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
    var hash = crypto.createHash('sha512');
    let data = hash.update(req.body.password, 'utf-8'); 
    gen_hash = data.digest('hex');
    const t = await sequelize.transaction();
    try {
        const Usersdetail = await Users.create({
            username: req.body.username,
            email: req.body.email,
            user_type: req.body.user_type,
            customer_id: req.body.customer_id,
            merchand_id: req.body.merchand_id,
            promotor_id: req.body.promotor_id,
            store_id: req.body.store_id,
            storegroup_id: req.body.storegroup_id,
            supervisor_id: req.body.supervisor_id,
            password: gen_hash,            
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Usersdetail) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            password:gen_hash,
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
        const Usersdetails = await Users.update({
            username: req.body.username,
            email: req.body.email,
            user_type: req.body.user_type,
            customer_id: req.body.customer_id,
            merchand_id: req.body.merchand_id,
            promotor_id: req.body.promotor_id,
            store_id: req.body.store_id,
            storegroup_id: req.body.storegroup_id,
            supervisor_id: req.body.supervisor_id,
            password: gen_hash,            
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id:req.body.username} });

        if (!Usersdetails) {
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
exports.updateRecordsByUsername = async (req, res, next) => {
    console.log("updated username list")
    var hash = crypto.createHash('sha512');
    let data = hash.update(req.body.password, 'utf-8');
    gen_hash = data.digest('hex');
      try {
        const Usersdetails = await Users.update({
            username: req.body.username,
            email: req.body.email,           
            password: gen_hash,   
            user_type: req.body.user_type,         
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { username: req.body.username} });
            
            const Customerdetails = await Customer.update({
            username: req.body.username,
            email: req.body.email,           
            password: gen_hash,   
            user_type: req.body.user_type,         
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { username: req.body.username} });
        if (!Usersdetails && !Customerdetails) {
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

    const UsersId = req.params.id;
    try {
        const details = await Users.update({
            is_deleted: '1'
        },
            { where: { id: UsersId } });
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