const Supervisor = require('../../models/supervisor.model');
const Promotor = require('../../models/promotor.model');
const Merchand = require('../../models/merchandiser.model');
const Store = require('../../models/store.model');
const User = require('../../models/users.model');
const LoginReport=require('../../models/loginrecord.model')
const sequelize = require('../../config/database');
const { Op,fn,col } = require('sequelize');

exports.postdashboardRecords = async (req, res, next) => {
    try {        
        const Supervisor_count = await Supervisor.findAndCountAll({

            where: { customer_id:req.body.customer_id,is_deleted: '0' }
        });
        const Promotor_count = await Promotor.findAndCountAll({

            where: {customer_id:req.body.customer_id, is_deleted: '0' }
        });
        const Merchand_count = await Merchand.findAndCountAll({

            where: {customer_id:req.body.customer_id, is_deleted: '0' }
        });
        const Store_count = await Store.findAndCountAll({

            where: {customer_id:req.body.customer_id, is_deleted: '0' }
        });
        if (!Supervisor_count && Store_count && Merchand_count && Promotor_count) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        console.log("supervisor is",Supervisor_count.count)
        res.status(200).json({
            message: "Result Fetched",
            Total_Supervisor: Supervisor_count.count,
            Total_Merchand: Merchand_count.count,
            Total_Promotor: Promotor_count.count,
            Total_Stores: Store_count.count,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getLoginReportMerchand = async (req, res, next) => {
    try {
        const filteredData = await LoginReport.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, 
                // {
                //     model: Promotor,
                //     attributes: ['id', 'first_name'],
                //     // attributes: [models.sequelize.fn('CONCAT', 'first_name', 'last_name')]
                // },
                 {
                    model: Merchand,
                    attributes: ['id','first_name','last_name'],

                },
                 {
                    model: User,
                    attributes: ['id'],
                },
            ],
            // where:getFilterConditions(req),
            where:{promotor_id:null},
            // where: {
            //     [Op.and]: [
            //         { promotor_id:  null },
            //         { customer_id: req.body.customer_id },
            //     ]
            // },
            attributes: ['id',
            [sequelize.fn('Date', sequelize.col('login_time')), 'LoginDate'],
            [sequelize.fn('Time', sequelize.col('login_time')), 'LoginTime'],
            [sequelize.fn('Time', sequelize.col('logout_time')), 'LogoutTime'],
            [sequelize.fn('Date', sequelize.col('logout_time')), 'LogoutDate'],]          
        });
       
      
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getLoginReportMerchandCustomer = async (req, res, next) => {
    try {
        const filteredData = await LoginReport.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, 
                // {
                //     model: Promotor,
                //     attributes: ['id', 'first_name'],
                //     // attributes: [models.sequelize.fn('CONCAT', 'first_name', 'last_name')]
                // },
                 {
                    model: Merchand,
                    attributes: ['id','first_name','last_name'],

                },
                 {
                    model: User,
                    attributes: ['id'],
                },
            ],
            // where:getFilterConditions(req),
            // where:{promotor_id:null},
            where: {
                [Op.and]: [
                    { promotor_id:  null },
                    { customer_id: req.body.customer_id },
                ]
            },
            attributes: ['id',
            [sequelize.fn('Date', sequelize.col('login_time')), 'LoginDate'],
            [sequelize.fn('Time', sequelize.col('login_time')), 'LoginTime'],
            [sequelize.fn('Time', sequelize.col('logout_time')), 'LogoutTime'],
            [sequelize.fn('Date', sequelize.col('logout_time')), 'LogoutDate'],]          
        });
       
      
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getLoginReportPromotor = async (req, res, next) => {
    try {
        const filteredData = await LoginReport.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, 
                {
                    model: Promotor,
                    attributes: ['id', 'first_name','last_name'],
                    // attributes: [models.sequelize.fn('CONCAT', 'first_name', 'last_name')]
                },
                //  {
                //     model: Merchand,
                //     attributes: ['id'],

                // },
                 {
                    model: User,
                    attributes: ['id'],
                },
            ],
            // where:getFilterConditions(req),
            where:{merchand_id:null},            
            attributes: [
                'id',
                [sequelize.fn('Date', sequelize.col('login_time')), 'LoginDate'],
                [sequelize.fn('Time', sequelize.col('login_time')), 'LoginTime'],
                [sequelize.fn('Time', sequelize.col('logout_time')), 'LogoutTime'],
                [sequelize.fn('Date', sequelize.col('logout_time')), 'LogoutDate'],
              ]
            // attributes: ['id','login_time','logout_time',]
        });
       
      
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getLoginReportPromotorCustomer = async (req, res, next) => {
    try {
        const filteredData = await LoginReport.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, 
                {
                    model: Promotor,
                    attributes: ['id', 'first_name','last_name'],
                    // attributes: [models.sequelize.fn('CONCAT', 'first_name', 'last_name')]
                },
                //  {
                //     model: Merchand,
                //     attributes: ['id'],

                // },
                 {
                    model: User,
                    attributes: ['id'],
                },
            ],
            // where:getFilterConditions(req),
            // where:{merchand_id:null},
            where: {
                [Op.and]: [
                    { merchand_id:  null },
                    { customer_id: req.body.customer_id },
                ]
            },
            attributes: [
                'id',
                [sequelize.fn('Date', sequelize.col('login_time')), 'LoginDate'],
                [sequelize.fn('Time', sequelize.col('login_time')), 'LoginTime'],
                [sequelize.fn('Time', sequelize.col('logout_time')), 'LogoutTime'],
                [sequelize.fn('Date', sequelize.col('logout_time')), 'LogoutDate'],
              ]
            // attributes: ['id','login_time','logout_time',]
        });
       
      
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
function getFilterConditions(req) {
    var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = req.body.store_id;    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
        whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;

    return whereStatement;
  }
