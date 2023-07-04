const Customer = require('../models/customerdetail.model');
const helper = require('../config/helpers')
var moment = require("moment");
const Supervisor = require('../models/supervisor.model');
const Promotor = require('../models/promotor.model');
const Merchand = require('../models/merchandiser.model');
const Store = require('../models/store.model');
const Targettopromotor=require('../models/assignTarget.model')
const User = require('../models/users.model');
const LoginReport=require('../models/loginrecord.model')

exports.getRecords = async (req, res, next) => {
    try {
        const Cust_count = await Customer.findAndCountAll({

            where: { is_deleted: '0' }
        });
        const Supervisor_count = await Supervisor.findAndCountAll({

            where: { is_deleted: '0' }
        });
        const Promotor_count = await Promotor.findAndCountAll({

            where: { is_deleted: '0' }
        });
        const Merchand_count = await Merchand.findAndCountAll({

            where: { is_deleted: '0' }
        });
        const Store_count = await Store.findAndCountAll({

            where: { is_deleted: '0' }
        });
        if (!Cust_count) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            Total_Customer: Cust_count.count,
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

exports.getTrendingPromotor = async (req, res, next) => {
    try {
        var Targetpercent ,allTrendingpromotor=[];
        
        const trendingpromo = await Promotor.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, {
                    model: Customer,
                    attributes: ['id', 'company_name'],
                }],
            where: { is_deleted: '0' },
            attributes: ['id','first_name', 'last_name']
        });
       
        const assignedtarget=await Targettopromotor.findAll({
            where: { is_deleted: '0' },
        })

      
           
        Targetpercent= assignedtarget.target_achieved/assignedtarget.target_assigned*100;
        if (!trendingpromo) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: trendingpromo,
// percentage:assignedtarget

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
exports.getLoginReport = async (req, res, next) => {
    try {
        const filteredData = await LoginReport.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, {
                    model: Promotor,
                    attributes: ['id', 'first_name'],
                    // attributes: [models.sequelize.fn('CONCAT', 'first_name', 'last_name')]
                },
                 {
                    model: Merchand,
                    attributes: ['id'],

                },
                 {
                    model: User,
                    attributes: ['id'],
                },
            ],
            where:getFilterConditions(req),

            attributes: ['id','login_time','logout_time']
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

    return whereStatement;
  }
