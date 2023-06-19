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
const sequelize = require("sequelize");
const { Op } = require("sequelize");


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
            message: "Result Fetchedd",
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


// New APIS should be added

exports.getDashboardReport = async (req, res, next) => {
  const startDate = new Date("2022-12-31 00:00:00");
  const endDate = new Date("2023-12-31 00:00:00");
  try {
    const Cust_count = await Customer.findAndCountAll({
      where: {
        is_deleted: "0",
      },
    });
    const current_year_customer_count = await Customer.findAndCountAll({
      where: {
        is_deleted: "0",
        created_on: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const Supervisor_count = await Supervisor.findAndCountAll({
      where: { is_deleted: "0" },
    });

    const current_year_superviser_count = await Supervisor.findAndCountAll({
      where: {
        is_deleted: "0",
        created_on: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const Promotor_count = await Promotor.findAndCountAll({
      where: { is_deleted: "0" },
    });

    const current_year_promotor_count = await Promotor.findAndCountAll({
      where: {
        is_deleted: "0",
        created_on: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const Merchand_count = await Merchand.findAndCountAll({
      where: { is_deleted: "0" },
    });

    const current_year_merchandiser_count = await Merchand.findAndCountAll({
      where: {
        is_deleted: "0",
        created_on: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const Store_count = await Store.findAndCountAll({
      where: { is_deleted: "0" },
    });

    const current_year_store_count = await Store.findAndCountAll({
      where: {
        is_deleted: "0",
        created_on: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    if (!Cust_count) {
      return res.status(404).json({
        status: 404,
        message: "could not find result",
      });
    }
    res.status(200).json({
      message: "Result Fetched",
      data: {
        customers: {
          total: Cust_count.count,
          total_by_current_year: current_year_customer_count.count,
        },
        stores: {
          total: Store_count.count,
          total_by_current_year: current_year_store_count.count,
        },
        merchands: {
          total: Merchand_count.count,
          total_by_current_year: current_year_merchandiser_count.count,
        },
        promoters: {
          total: Promotor_count.count,
          total_by_current_year: current_year_promotor_count.count,
        },

        // Total_Customer: Cust_count,
        // Total_Supervisor: Supervisor_count,
        Total_Merchand: Merchand_count,
        Total_Promotor: Promotor_count,
        // Total_Stores: Store_count,
        // Total_Customer_This_Year: current_year_customer_count,
        // Total_Store_This_Year: current_year_store_count,
        // Total_Promoter_This_Year: current_year_promotor_count,
        // Total_Merchandiser_This_Year: current_year_merchandiser_count,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    helper.logger.info(error);
  }
};

exports.getTopRecords = async (req, res, next) => {
  try {
    const Cust_data = await Customer.findAndCountAll({
      where: { is_deleted: "0" },
      limit: 10,
      order: [["created_on", "DESC"]],
    });
    const Supervisor_count = await Supervisor.findAndCountAll({
      where: { is_deleted: "0" },
      limit: 10,
      order: [["created_on", "DESC"]],
    });
    const Promotor_count = await Promotor.findAndCountAll({
      where: { is_deleted: "0" },
      limit: 10,
      order: [["created_on", "DESC"]],
    });
    const Merchand_count = await Merchand.findAndCountAll({
      where: { is_deleted: "0" },
      order: [["created_on", "DESC"]],
      limit: 10,
    });
    const Store_count = await Store.findAndCountAll({
      where: { is_deleted: "0" },
      order: [["created_on", "DESC"]],
    });

    if (!Cust_data) {
      return res.status(404).json({
        status: 404,
        message: "could not find result",
      });
    }
    res.status(200).json({
      message: "Result Fetched",
      data: {
        // Top_Customer: Cust_data.rows,
        // Top_Supervisor: Supervisor_count.rows,
        Top_Merchand: Merchand_count.rows,
        Top_Promotor: Promotor_count.rows,
        // Total_Stores: Store_count.rows,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    helper.logger.info(error);
  }
};

// new code ends here
























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
            attributes: ['id','first_name', 'last_name'],
             limit: 5,
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


