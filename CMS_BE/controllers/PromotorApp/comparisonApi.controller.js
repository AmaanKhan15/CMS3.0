const AssignedPromotorSku = require("../../models/promotorskuentry.model")
const { Op, fn, col, literal } = require('sequelize');
var moment = require("moment");
const Feedback = require('../../models/feedbackpromotor.model')
const SKU = require('../../models/sku.model')
const helper = require('../../config/helpers');
function getStartNoOfMonth(quarter) {
    switch (quarter) {
        case "01":
            return "10"
        case "02":
            return "01"

        case "03":
            return "04"
        case "04":
            return "07"
    }
}
function getdailyweekdays(month) {
    let out = [], week = 1;
    while (week <= 14) {
        var startOfday = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
        var endOfday = moment(startOfday).endOf('week').toDate();
        out.push({ "weekno": week, "startofweek": startOfday, "endofweek": endOfday })
        week++;
    }
    return out;
}
function getQuarterdata(month,year) {
    let out = [], week = 1;
    while (week <= 14) {
        var startOfday = moment(`${month}01${year}`, "MMDDYYYY").startOf('week').add(week - 1, 'week').toDate();
        if (week == 1) {
            out.push({ "weekno": week, "startofweek": startOfday })
        }
        if (week == 14) {
            out.push({ "weekno": week, "endtofweek": startOfday })
        }
        week++;
    }
    return out;
}
async function getWeekFilterData(month, req,callback){
    let week = 1, currWeek, regWeek = [],regSales=[], max_sales = [];
    while (week <= 14) {
        var startOfWeek = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
        var endOfWeek = moment(startOfWeek).endOf('week').toDate();
            currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('sum', col('total_sales_qty')), "sales"]],
                where: getWeeklyFilter(req, startOfWeek, endOfWeek),
                raw: true,
            })
            var obj = {};
            obj["Months"] = currWeek;
            max_sales.push(currWeek[0]['sales'])
            if (currWeek[0]['sales'] == null) {
                regWeek.push(`week ${week}`);
                regSales.push(0)
            } else {
                regWeek.push( `week ${week}`);
                regSales.push(currWeek[0]['sales'])

            }
        week++;
    }
    callback({
        max_total_sales: Math.max.apply(null, max_sales),
        Week: regWeek,
        Sales: regSales,
    }); 
   
}
exports.postWeeklySalesSummery = async (req, res, next) => {
    try {
        var month1 = getStartNoOfMonth(req.body.quarter_filter_1);
        var month2 = getStartNoOfMonth(req.body.quarter_filter_2);
        getWeekFilterData(month1, req, function (result1) {
            getWeekFilterData(month2, req, function (result2) {
                return res.status(200).send({
                    message: "data",
                    quarter_filter_1_data: result1,
                    quarter_filter_2_data: result2,
                })
            })
        });
       
    } catch (error) {
        next(error);
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
function getDailyFilterData(data, week_filter, req, callback) {
    let days = 1, regWeek = [],salesWeek=[], max_sales = [], final_Data = [];
    data.forEach(async (item) => {
        if (item.weekno == week_filter) {
            while (days <= 7) {
                var date = moment(item.startofweek, 'YYY-MM-DD').format(`DD MM YYYY`);
                var dataArray = date.split(/[ ,]/);
                var check = moment(`${dataArray[1]}${dataArray[0]}${dataArray[2]}`, "MMDDYYYY").add(days - 1, 'day').toDate();
                var weekday = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
                var dayName = weekday[check.getDay()];
                var Months = moment(check, 'YYY-MM-DD').format(`YYYY MM DD`)
                var dayOnly = Months.split(/[ ,]/);
                const currWeek = await AssignedPromotorSku.findAll({
                    attributes: [[fn('sum', col('total_sales_qty')), "sales"]],
                    where: getTotalSalesDays(req, check),
                    raw: true,
                })
                var obj = {};
                obj[Months] = currWeek;
                if (currWeek[0]['sales'] == null) {
                    max_sales.push(0)
                    regWeek.push( `${ dayName}`);
                    salesWeek.push(0);
                } else {
                    max_sales.push(currWeek[0]['sales'])
                    regWeek.push(`${ dayName}` );
                    salesWeek.push( currWeek[0]['sales']);
                }
                days++;
            }
            callback({
                max_total_sales: Math.max.apply(null, max_sales),
                Week: regWeek,
                Sales: salesWeek,
            });
        }

    })
}
exports.postSalesSummeryDaily = async (req, res, next) => {
    try {
        var month = getStartNoOfMonth(req.body.quarter)
        var data = getdailyweekdays(month);
        getDailyFilterData(data, req.body.week_filter_1, req, function (result1) {
            getDailyFilterData(data, req.body.week_filter_2, req, function (result2) {
                return res.status(200).send({
                    message: "data",
                    week_filter_1_data: result1,
                    week_filter_2_data: result2,
                })
            });

        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
async function getYearlyFilterData(year,req,callback){
    let quarter = ['01', '02', '03', '04'], i = 0;
    var finalarray = [], regWeek = [],regSales=[], max_sales = [];
    while (i < quarter.length) {
        var month = getStartNoOfMonth(quarter[i])
        currWeek = getQuarterdata(month,year);
        regWeek.push({ "data": currWeek })
        i++;
    }
    regWeek.map(async (item, key) => {
        const currWeek = await AssignedPromotorSku.findAll({
            attributes: [[fn('sum', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
            where: getTotalSalesYear(req, item.data[0].startofweek, item.data[1].endtofweek),
            raw: true,
        })
        if (currWeek[0]['sales'] == null) {
            max_sales.push(0)
            finalarray.push(`Q${key + 1}`);
            regSales.push(0)
        } else {
            max_sales.push(currWeek[0]['sales'])
            finalarray.push( `Q${key + 1}`);
            regSales.push(currWeek[0]['sales']);
        } if (finalarray.length == 4) {
            callback({
                status: 200,
                max_total_sales: Math.max.apply(null, max_sales),
                Quarter: finalarray,
                Sales:regSales
            });
        }
    })
}
exports.postSalesSummeryYear = async (req, res, next) => {
    try {
        getYearlyFilterData( req.body.year_filter_1, req, function (result1) {
            getYearlyFilterData( req.body.year_filter_2, req, function (result2) {
                return res.status(200).send({
                    message: "data",
                    week_filter_1_data: result1,
                    week_filter_2_data: result2,
                })
            });

        });
       
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });

    }

}

//Run Rate Api

async function getWeeklyRunrate(quarter,req,callback){
    let week = 1, currWeek, regWeek = [],regSales=[], max_sales = [];
    var month = getStartNoOfMonth(quarter)
    var monthCount = parseInt(month) + parseInt(02);
    while (week <= 14) {

        var startOfWeek = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
        var endOfWeek = moment(startOfWeek).endOf('week').toDate();
        var Months = moment(startOfWeek, 'YYY-MM-DD').format('DD MM MMMM')
        var dataArray = Months.split(/[ ,]/);
        if (dataArray[1] <= monthCount || dataArray[1] == 12) {
            currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('avg', col('total_sales_qty')), "sales"]],
                where: getWeeklyFilter(req, startOfWeek, endOfWeek),
                raw: true,
            })
            var obj = {};
            obj["Months"] = currWeek;
            max_sales.push(currWeek[0]['sales'])
            if (currWeek[0]['sales'] == null) {
                regWeek.push( `week ${week}`);
                regSales.push(0)
            } else {
                regWeek.push(`week ${week}`);
                regSales.push(currWeek[0]['sales']);
            }
        }
        week++;
    }
    callback({
        status: 200,
        week: regWeek,
        Sales: regSales
    });
}
exports.postWeeklyRunrate = async (req, res, next) => {
    try {
        getWeeklyRunrate( req.body.quarter_filter_1, req, function (result1) {
            getWeeklyRunrate( req.body.quarter_filter_2, req, function (result2) {
                return res.status(200).send({
                    message: "data",
                    week_filter_1_data: result1,
                    week_filter_2_data: result2,
                })
            });
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
async function getQuarterRunrate(year,req,callback){
    let quarter = ['01', '02', '03', '04'], i = 0;
    var finalarray = [], regWeek = [],regSales=[], max_sales = [];
    while (i < quarter.length) {
        var month = getStartNoOfMonth(quarter[i])
        currWeek = getQuarterdata(month,year);
        regWeek.push({ "data": currWeek })
        i++;
    }
    regWeek.map(async (item, key) => {
        const currWeek = await AssignedPromotorSku.findAll({
            attributes: [[fn('avg', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
            where: getTotalSalesYear(req, item.data[0].startofweek, item.data[1].endtofweek),
            raw: true,
        })
        if (currWeek[0]['sales'] == null) {
            max_sales.push(0)
            finalarray.push(`Q${key + 1}`);
            regSales.push(0)
        } else {
            max_sales.push(currWeek[0]['sales'])
            finalarray.push(`Q${key + 1}`);
            regSales.push(currWeek[0]['sales'])
        } if (finalarray.length == 4) {
            callback({
                status: 200,
                max_total_sales: Math.max.apply(null, max_sales),
                Quarter: finalarray,
                Sales: regSales
            });
        }
    })
}
exports.postQuarterlyRunrate = async (req, res, next) => {
    try {
        getQuarterRunrate( req.body.year_filter_1, req, function (result1) {
            getQuarterRunrate( req.body.year_filter_2, req, function (result2) {
                return res.status(200).send({
                    message: "data",
                    week_filter_1_data: result1,
                    week_filter_2_data: result2,
                })
            });
        });    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });

    }

}

function getWeeklyFilter(req, startOfWeek, endOfWeek) {
    var whereStatement = {};
    if (req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if (req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if (req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    whereStatement.createdAt = {
        [Op.gte]: moment(startOfWeek).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(endOfWeek).format('YYYY-MM-DD 23:59')
    }
    return whereStatement;
}
function getTotalSalesDays(req, startOfWeek) {
    var whereStatement = {};
    if (req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if (req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if (req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    whereStatement.createdAt = {
        [Op.gte]: moment(startOfWeek).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(startOfWeek).format('YYYY-MM-DD 23:59')
    }
    return whereStatement;
}
function getTotalSalesYear(req, startOfMonth, endOfMonth) {
    var whereStatement = {};
    if (req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if (req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if (req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    whereStatement.createdAt = {
        [Op.gte]: moment(startOfMonth).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(endOfMonth).format('YYYY-MM-DD 23:59')
    }
    return whereStatement;
}