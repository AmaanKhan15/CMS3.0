const SKUEntry = require('../../models/promotorskuentry.model');
const SKU = require('../../models/sku.model');
const Store = require('../../models/store.model');
const sequelize = require('../../config/database');
const { Op, fn, col } = require('sequelize');
const helper = require('../../config/helpers')
var moment = require("moment");

exports.getiPodReportWeek = async (req, res, next) => {
    try {
        const d = new Date();
        let month = d.getMonth() + 1
        console.log(month)
        const W1 = await SKUEntry.findAll({
            include: [{
                model: Store,
                where: getStoreFilter(req),
                attributes: ['id', 'store_name', 'area'],
            },
            {
                model: SKU,
                where: getSKUFilter(req),
                attributes: ['id', 'product_name']
            },
            ],
            attributes: [
                'total_sales_qty'
            ],
            where: getAssignedSKUFilter(req)
        });
        const W2 = await SKUEntry.findAll({
            include: [{
                model: Store,
                where: getStoreFilter(req),
                attributes: ['id', 'store_name'],
            },
            {
                model: SKU,
                where: getSKUFilter(req),
                attributes: ['id', 'product_name']
            },
            ],
            attributes: [
                'total_sales_qty'
            ],
            where: getAssignedSKUFilterW2(req)
        });
        const W3 = await SKUEntry.findAll({
            include: [{
                model: Store,
                where: getStoreFilter(req),
                attributes: ['id', 'store_name'],
            },
            {
                model: SKU,
                where: getSKUFilter(req),
                attributes: ['id', 'product_name']
            },
            ],
            attributes: [
                'total_sales_qty'
            ],
            where: getAssignedSKUFilterW3(req)
        });
        const W4 = await SKUEntry.findAll({
            include: [{
                model: Store,
                where: getStoreFilter(req),
                attributes: ['id', 'store_name'],
            },
            {
                model: SKU,
                where: getSKUFilter(req),
                attributes: ['id', 'product_name']
            },
            ],
            attributes: [
                'total_sales_qty'
            ],
            where: getAssignedSKUFilterW4(req)
        });
        const Product = await SKU.findAll({
            where: { category: 'iPod' },
            attributes: ['product_name', 'id'], group: ['product_name']
        });
        const filterData = [];

        Product.map((pro) => {
            var w1total = 0;
            var w2total = 0;
            var w3total = 0;
            var w4total = 0;
            W1.map((item1) => {
                if (pro.product_name == item1.sku_detail['product_name']) {
                    w1total += parseInt(item1.total_sales_qty);
                }
            })
            W2.map((item1) => {
                if (pro.product_name == item1.sku_detail['product_name']) {
                    w2total += parseInt(item1.total_sales_qty);
                }
            })
            W3.map((item1) => {
                if (pro.product_name == item1.sku_detail['product_name']) {
                    w3total += parseInt(item1.total_sales_qty);
                }
            })
            W4.map((item1) => {
                if (pro.product_name == item1.sku_detail['product_name']) {
                    w4total += parseInt(item1.total_sales_qty);
                }
            })
            filterData.push({ name: pro.product_name, data: [w1total, w2total, w3total, w4total], color: 'rgba(48,96,96,0.9)' })
        })
        if (!filterData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            Series: filterData,
            Week: W1
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
async function GetCurrentYeardata(req, Year) {

    const Q1 = await SKUEntry.findAll({
        include: [{
            model: Store,
            where: getStoreFilter(req),
            attributes: ['id', 'store_name'],
        },
        {
            model: SKU,
            where: getSKUFilter(req),
            attributes: ['id', 'product_name', 'category']
        },
        ],
        attributes: [
            'total_sales_qty'
        ],
        where: getAssignedSKUFilterQuarter1(req, Year),
    });
    const Q2 = await SKUEntry.findAll({
        include: [{
            model: Store,
            where: getStoreFilter(req),
            attributes: ['id', 'store_name'],
        },
        {
            model: SKU,
            where: getSKUFilter(req),
            attributes: ['id', 'product_name', 'category']
        },
        ],
        attributes: [
            'total_sales_qty'
        ],
        where: getAssignedSKUFilterQuarter2(req, Year),
    });
    const Q3 = await SKUEntry.findAll({
        include: [{
            model: Store,
            where: getStoreFilter(req),
            attributes: ['id', 'store_name'],
        },
        {
            model: SKU,
            where: getSKUFilter(req),
            attributes: ['id', 'product_name', 'category']
        },
        ],
        attributes: [
            'total_sales_qty'
        ],
        where: getAssignedSKUFilterQuarter3(req, Year),
    });
    const Q4 = await SKUEntry.findAll({
        include: [{
            model: Store,
            where: getStoreFilter(req),
            attributes: ['id', 'store_name'],
        },
        {
            model: SKU,
            where: getSKUFilter(req),
            attributes: ['id', 'product_name', 'category']
        },
        ],
        attributes: [
            'total_sales_qty'
        ],
        where: getAssignedSKUFilterQuarter4(req, Year),
    });
    // }             
    // const filterData = [];
    var w1total = 0;
    var w2total = 0;
    var w3total = 0;
    var w4total = 0;
    Q1.map((item1) => {
        w1total += parseInt(item1.total_sales_qty);
    })
    Q2.map((item1) => {
        w2total += parseInt(item1.total_sales_qty);
    })
    Q3.map((item1) => {
        w3total += parseInt(item1.total_sales_qty);
    })
    Q4.map((item1) => {
        w4total += parseInt(item1.total_sales_qty);
    })
    var date = new Date();
    var CuurentYear = date.getFullYear()  
   
     var filterData = { name: Year, data: [w1total, w2total, w3total, w4total], color:`${CuurentYear!==Year?"#D3D3D3":'#306060'}` };
     return filterData;
   
}

exports.getiPodReportQuater = async (req, res, next) => {
    try {
        var date = new Date();
        var Year = date.getFullYear()  
        var series = [];
        const previousYear = Year - 1;
        GetCurrentYeardata(req, Year)
            .then(function (result) {               
                GetCurrentYeardata(req, previousYear)
                    .then(function (prevdata) {
                        series.push(result, prevdata)
                        if (!prevdata) {
                            return res.status(404).json({
                                status: 404,
                                message: 'could not find result',
                            })
                        }
                        res.status(200).json({
                            message: "Result Fetched",
                            Series: series,
                        })
                    })                
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
function getSKUFilter(req) {
    var whereStatement = {};
    if (req.body.product_name)
        whereStatement.product_name = req.body.product_name;
    whereStatement.category = 'iPod';

    return whereStatement;
}
function getStoreFilter(req) {
    var whereStatement = {};
    if (req.body.area)
        whereStatement.area = req.body.area;

    return whereStatement;
}
function getAssignedSKUFilter(req) {
    var whereStatement = {};
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastday = addDays(firstDay, 7)
    console.log("first week is", firstDay, lastday)
    if (req.body.month) {
        var firstDay = new Date(date.getFullYear(), req.body.month, 1);
        var lastday = addDays(firstDay, 7)
        whereStatement.createdAt = {
            [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(lastday).format('YYYY-MM-DD 23:59')
        }
    } else
        whereStatement.createdAt = {
            [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(lastday).format('YYYY-MM-DD 23:59')
        }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }

    return whereStatement;
}
function getAssignedSKUFilterW2(req) {
    var whereStatement = {};
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var Secondweekfirstday = addDays(firstDay, 7)
    var Secondweeklastday = addDays(Secondweekfirstday, 7)
    if (req.body.month) {
        var firstDay = new Date(date.getFullYear(), req.body.month, 1);
        //    var lastday=addDays(firstDay,7)
        var Secondweekfirstday = addDays(firstDay, 7)
        var Secondweeklastday = addDays(Secondweekfirstday, 7)

        whereStatement.createdAt = {
            [Op.gt]: moment(Secondweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Secondweeklastday).format('YYYY-MM-DD 23:59')
        }
    } else
        whereStatement.createdAt = {
            [Op.gt]: moment(Secondweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Secondweeklastday).format('YYYY-MM-DD 23:59')
        }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}
function getAssignedSKUFilterW3(req) {
    var whereStatement = {};
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var Thirdweekfirstday = addDays(firstDay, 14)
    var Thirdweeklastday = addDays(Thirdweekfirstday, 7)
    if (req.body.month) {
        var firstDay = new Date(date.getFullYear(), req.body.month, 1);
        //    var lastday=addDays(firstDay,7)
        var Thirdweekfirstday = addDays(firstDay, 14)
        var Thirdweeklastday = addDays(Thirdweekfirstday, 7)

        whereStatement.createdAt = {
            [Op.gt]: moment(Thirdweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Thirdweeklastday).format('YYYY-MM-DD 23:59')
        }
    } else
        whereStatement.createdAt = {
            [Op.gt]: moment(Thirdweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Thirdweeklastday).format('YYYY-MM-DD 23:59')
        }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }

    return whereStatement;
}
function getAssignedSKUFilterW4(req) {
    var whereStatement = {};
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var Fourthweekfirstday = addDays(firstDay, 21)
    var Fourthweeklastday = addDays(Fourthweekfirstday, 7)
    if (req.body.month) {
        var firstDay = new Date(date.getFullYear(), req.body.month, 1);
        //    var lastday=addDays(firstDay,7)
        var Fourthweekfirstday = addDays(firstDay, 21)
        var Fourthweeklastday = addDays(Fourthweekfirstday, 7)
        whereStatement.createdAt = {
            [Op.gt]: moment(Fourthweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Fourthweeklastday).format('YYYY-MM-DD 23:59')
        }
    } else
        whereStatement.createdAt = {
            [Op.gt]: moment(Fourthweekfirstday).format('YYYY-MM-DD 00:00'),
            [Op.lte]: moment(Fourthweeklastday).format('YYYY-MM-DD 23:59')
        }

    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}
function getAssignedSKUFilterQuarter1(req, year) {
    var whereStatement = {};
    var firstDay = new Date(year, 10, 1);
    var lastDay = new Date(year, 12, 31);

    whereStatement.createdAt = {
        [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDay).format('YYYY-MM-DD 23:59')
    }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}
function getAssignedSKUFilterQuarter2(req, year) {
    var whereStatement = {};
    var firstDay = new Date(year, 1, 1);
    var lastDay = new Date(year, 3, 31);

    whereStatement.createdAt = {
        [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDay).format('YYYY-MM-DD 23:59')
    }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}
function getAssignedSKUFilterQuarter3(req, year) {
    var whereStatement = {};
    var firstDay = new Date(year, 4, 1);
    var lastDay = new Date(year, 7, 31);

    whereStatement.createdAt = {
        [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDay).format('YYYY-MM-DD 23:59')
    }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}
function getAssignedSKUFilterQuarter4(req, year) {
    var whereStatement = {};
    var firstDay = new Date(year, 8, 1);
    var lastDay = new Date(year, 10, 31);

    whereStatement.createdAt = {
        [Op.gt]: moment(firstDay).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDay).format('YYYY-MM-DD 23:59')
    }
    if (req.body.customer_id) {
        whereStatement.customer_id = req.body.customer_id;
    }
    return whereStatement;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}