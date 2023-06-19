const Customer = require('../models/customerdetail.model');
const SKU =require('../models/sku.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const sequelize = require('../config/database');
const Supervisor = require('../models/supervisor.model');
const Promotor = require('../models/promotor.model');
const Merchandiser = require('../models/merchandiser.model');
const Store = require('../models/store.model');
const Utils = require("../utils/token.utils");
const User=require("../models/users.model")
const { Op} = require('sequelize');

exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Customer.findAll({
            include: [
                             
              {
              model: Supervisor,
              attributes: ['id','first_name','phone_no'],
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
exports.getCustomerList = async (req, res, next) => {
    var allCustomers=[], allPromotor=[],allStores=[],allMerchand=[];
    
    try {
        const Data = await Customer.findAll({                
        where: {  is_deleted: '0' }
    });
    Data.map((item)=>{
        allCustomers.push({id:item.id,Name:item.company_name,Username:item.email,Password:item.password})
    })
    // var storeArr = allCustomers.split(',');

    for (i = 0; i < allCustomers.length; i++) {
        const list_promotor = await Promotor.findAndCountAll({ 
        include: [                             
            {
            model: Customer,
            attributes: ['id','first_name','phone_no'],
          }],                
        where: { customer_id:allCustomers[i].id, is_deleted: '0' },
        attributes:['id','first_name']
    });
        const list_merchand = await Merchandiser.findAndCountAll({ 
        include: [                             
            {
            model: Customer,
            attributes: ['id','first_name','phone_no'],
          }],                
        where: { customer_id:allCustomers[i].id, is_deleted: '0' },
        attributes:['id','first_name']
    });
        const list_store = await Store.findAndCountAll({ 
        include: [                             
            {
            model: Customer,
            attributes: ['id','first_name','phone_no'],
          }],                
        where: { customer_id:allCustomers[i].id, is_deleted: '0' },
        attributes:['id','store_name']
    });
    const sku_details = await SKU.findAndCountAll({ 
        include: [                             
            {
            model: Customer,
            attributes: ['id','first_name','phone_no'],
          }],   
          where: {customer_id: {
            [Op.like]: '%' + allCustomers[i].id + '%'
        },is_deleted: '0'},             
        // where: { customer_id:allCustomers[i].id, is_deleted: '0' },
        attributes:['id','sku']
    });

    allMerchand.push({ Customer: allCustomers[i].id,Customer_Name:allCustomers[i].Name,Password:allCustomers[i].Password,User_name:allCustomers[i].Username,MerchandCount: list_merchand.count,PromotorCount: list_promotor.count,StoreCount: list_store.count,SKUCount:sku_details.count})
    // allPromotor.push({ PromotorCount: list_promotor })
    }
   
        if (!allPromotor && allMerchand) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",          
            List_Customer: allMerchand,
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
        const Data = await Customer.findAll({
            // attributes: ['id', 'first_name','assigned_supervisor'],
            include: [                             
                {
                model: Supervisor,
                attributes: ['id','first_name','phone_no'],
              }],                
            where: { id: req.params.CustomerId, is_deleted: '0' }
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


exports.getLatestRecords = async (req, res, next) => {
    try {
        const Data = await Customer.findAll({
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ]] ,              
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
        const Usersdetail = await User.create({
            email: req.body.email,
            user_type: "Customer",
            username: req.body.username,
            password: gen_hash,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        })
        const customerdetail = await Customer.create({
            company_name: req.body.company_name,
            first_name: req.body.first_name,
            middle_name: "",
            last_name: req.body.last_name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            city: req.body.city,
            address: req.body.address,
            assigned_supervisor:1,
            username: req.body.username,
            password: gen_hash,
            id_proof:req.body.id_proof,
            is_shelf: req.body.is_shelf,
            is_floor: req.body.is_floor,
            is_refreg: req.body.is_refreg,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!customerdetail && Usersdetail) {
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
        const Usersdetail = await User.update({
            email: req.body.email,
            user_type: "Customer",
            username: req.body.username,
            password: gen_hash,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        })
        const customerdetail = await Customer.update({
            company_name: req.body.company_name,
            first_name: req.body.first_name,
            middle_name: "",
            last_name: req.body.last_name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            city: req.body.city,
            address: req.body.address,
            assigned_supervisor:1,
            username: req.body.username,
            password: gen_hash,
            id_proof:req.body.id_proof,
            is_shelf: req.body.is_shelf,
            is_floor: req.body.is_floor,
            is_refreg: req.body.is_refreg,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!customerdetail && Usersdetail) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    }catch (error) {

        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
}
exports.updateSupervisorValue = async (req, res, next) => {
   try {
        const Customerdetails = await Customer.update({
           assigned_supervisor:req.body.assigned_supervisor,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.CustomerId } });

        if (!Customerdetails) {
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

    const CustomerId = req.params.id;
    try {
        const details = await Customer.update({
            is_deleted: '1'
        },
            { where: { id: CustomerId } });
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