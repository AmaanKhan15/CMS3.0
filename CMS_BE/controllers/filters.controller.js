const Customer = require('../models/customerdetail.model');
const helper = require('../config/helpers')
var moment = require("moment");
const Warhouse = require('../models/warehouse.model');
const Store = require('../models/store.model');
const SKU = require('../models/sku.model');

const { Op,fn, col } = require('sequelize');
const Promotor = require('../models/promotor.model');

exports.getFilteredData = async (req, res, next) => {
    try {
        const filteredData = await Warhouse.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, {
                    model: Promotor,
                    // attributes: ['id', 'first_name'],
                    attributes: [ [fn('concat', col('first_name'), ' ', col('last_name')), "FullName"],'id']
                },
                 {
                    model: SKU,
                    attributes: ['id', 'sku_qty'],
                },
            ],
            where:getFilterConditions(req),

            attributes: ['id','damage_qty', 'total_sales_qty','qty_warehouse']
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
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.sku_id)
        whereStatement.sku_id = req.body.sku_id;

    return whereStatement;
  }
