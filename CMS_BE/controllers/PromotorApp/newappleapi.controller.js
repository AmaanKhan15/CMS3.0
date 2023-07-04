const AssignedPromotorSku = require("../../models/promotorskuentry.model")
const { Op, fn, col, literal } = require('sequelize');
var moment = require("moment");
const Feedback = require('../../models/feedbackpromotor.model')
const SKU = require('../../models/sku.model')
const helper = require('../../config/helpers');
const { isNull } = require("lodash");
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
function getQuarterdata(month) {
    let out = [], week = 1;
    while (week <= 14) {
        var startOfday = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
        var endOfday = moment(startOfday).endOf('week').toDate();
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

exports.postWeeklyTotalSales = async (req, res, next) => {
    try {
        let week = 1, currWeek, regWeek = [], regSales = [], max_sales = [];
        var month = getStartNoOfMonth(req.body.quarter)
        var monthCount = parseInt(month) + parseInt(02);
        while (week <= 14) {
            var startOfWeek = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
            var endOfWeek = moment(startOfWeek).endOf('week').toDate();
            var Months = moment(startOfWeek, 'YYY-MM-DD').format('DD MM MMMM')
            var dataArray = Months.split(/[ ,]/);
            if (dataArray[1] <= monthCount || dataArray[1] == 12) {
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
                    regWeek.push(`week ${week}`);
                    regSales.push(currWeek[0]['sales'])
                }
            }
            week++;
        }
        return res.status(200).send({
            message: "data",
            max_total_sales: Math.max.apply(null, max_sales),
            Weeks: regWeek,
            Sales: regSales,
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.posttotalSalesDaily = async (req, res, next) => {
    try {
        let days = 1, regWeek = [], regSales = [], max_sales = [];
        var month = getStartNoOfMonth(req.body.quarter)
        var data = getdailyweekdays(month)
        data.forEach(async (item, key) => {
            if (item.weekno == req.body.week) {
                while (days <= 7) {
                    var date = moment(item.startofweek, 'YYY-MM-DD').format(`DD MM YYYY`);
                    var dataArray = date.split(/[ ,]/);
                    var check = moment(`${dataArray[1]}${dataArray[0]}${dataArray[2]}`, "MMDDYYYY").add(days - 1, 'day').toDate();
                    var weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
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
                        regWeek.push(`${dayOnly[2] + " " + " " + dayName}`);
                        regSales.push(0);
                    } else {
                        max_sales.push(currWeek[0]['sales'])
                        regWeek.push(`${dayOnly[2] + " " + " " + dayName}`);
                        regSales.push(currWeek[0]['sales']);
                    }
                    days++;
                }
                return res.status(200).send({
                    message: "data",
                    max_total_sales: Math.max.apply(null, max_sales),
                    Day: regWeek,
                    Sales: regSales,
                })
            }
        })

    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.posttotalSalesYear = async (req, res, next) => {
    try {
        let quarter = ['01', '02', '03', '04'], i = 0;
        var finalarray = [], finalarraySales = [], regWeek = [], max_sales = [];
        while (i < quarter.length) {
            var month = getStartNoOfMonth(quarter[i])
            currWeek = getQuarterdata(month);
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
                finalarraySales.push(0)
            } else {
                max_sales.push(currWeek[0]['sales'])
                finalarray.push(`Q${key + 1}`);
                finalarraySales.push(currWeek[0]['sales'])
            } if (finalarray.length == 4) {
                return res.status(200).json({
                    status: 200,
                    max_total_sales: Math.max.apply(null, max_sales),
                    Quarter: finalarray,
                    Sales: finalarraySales
                });
            }
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });

    }

}

//Run Rate Api

exports.postWeeklyRunrate = async (req, res, next) => {
    try {
        let week = 1, currWeek, regWeek = [], regSales = [], max_sales = [];
        var month = getStartNoOfMonth(req.body.quarter)
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
                    regWeek.push(`week ${week}`);
                    regSales.push(0)
                } else {
                    regWeek.push(`week ${week}`);
                    regSales.push(currWeek[0]['sales'])
                }
            }
            week++;
        }
        return res.status(200).send({
            message: "data",
            max_total_sales: Math.max.apply(null, max_sales),
            Week: regWeek,
            Sales: regSales,
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.postQuarterlyRunrate = async (req, res, next) => {
    try {
        let quarter = ['01', '02', '03', '04'], i = 0;
        var finalarray = [], regWeek = [], regSales = [], max_sales = [];
        while (i < quarter.length) {
            var month = getStartNoOfMonth(quarter[i])
            currWeek = getQuarterdata(month);
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
                return res.status(200).json({
                    status: 200,
                    max_total_sales: Math.max.apply(null, max_sales),
                    Quarter: finalarray,
                    Sales: regSales
                });
            }
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });

    }

}

//SOB
exports.postWeeklySOB = async (req, res, next) => {
    try {
        let week = 1, currWeek, allWeek = [], regWeek = [], finaldata = [], finaldataName = [], finalDataPercentage = [], finaldataAmount = [];
        var month = getStartNoOfMonth(req.body.quarter)
        var monthCount = parseInt(month) + parseInt(02);
        while (week <= 14) {
            var startOfWeek = moment(`${month}01`, "MMDD").startOf('week').add(week - 1, 'week').toDate();
            var endOfWeek = moment(startOfWeek).endOf('week').toDate();
            var Months = moment(startOfWeek, 'YYY-MM-DD').format('DD MM MMMM')
            var dataArray = Months.split(/[ ,]/);
            if (dataArray[1] <= monthCount || dataArray[1] == 12) {
                currWeek = await Feedback.findAll({
                    attributes: [[fn('sum', col('sob_apple')), 'apple'], [fn('sum', col('sob_samsung')), 'samsung'], [fn('sum', col('sob_huawei')), 'huawei'], [fn('sum', col('sob_xiaomi')), 'xiaomi'], [fn('sum', col('sob_oppo')), 'oppo'], [fn('sum', col('sob_other')), 'other'], [fn('sum', col('sob_total')), 'total']],
                    where: getWeeklyFilter(req, startOfWeek, endOfWeek),
                    raw: true,
                })
                allWeek.push(currWeek)
            }
            week++;
        }

        currWeek.map((item) => {
            for (var property in item) {
                regWeek.push({ 'name': property, 'amount': '', 'percent': '' });
            }
        })
        var apple, samsung, huawei, xiaomi, oppo, other, total;
        allWeek.map((item1) => {
            if (item1[0].total !== null) {
                total = parseInt(item1[0].total) + parseInt(item1[0].total);
            }
            if (item1[0].apple !== null) {
                apple = parseInt(item1[0].apple) + parseInt(item1[0].apple);
                finaldataAmount.push(parseInt(apple))
                finalDataPercentage.push(parseFloat(parseFloat((apple / total) * 100).toFixed(2)))
                finaldataName.push('apple')
                finaldata.push({ 'name': 'apple', 'amount': parseInt(apple), 'percent': parseFloat(parseFloat((apple / total) * 100).toFixed(2)) })
            }
            if (item1[0].samsung !== null) {
                samsung = parseInt(item1[0].samsung) + parseInt(item1[0].samsung);
                finaldataAmount.push(parseInt(samsung))
                finalDataPercentage.push(parseFloat(parseFloat((apple / total) * 100).toFixed(2)))
                finaldataName.push('samsung')
                finaldata.push({ 'name': 'samsung', 'amount': parseInt(samsung), 'percent': parseFloat(parseFloat((samsung / total) * 100).toFixed(2)) })
            }
            if (item1[0].huawei !== null) {
                huawei = parseInt(item1[0].huawei) + parseInt(item1[0].huawei);
                finaldataAmount.push(parseInt(huawei))
                finalDataPercentage.push(parseFloat(parseFloat((huawei / total) * 100).toFixed(2)))
                finaldataName.push('huawei')

                finaldata.push({ 'name': 'huawei', 'amount': parseInt(huawei), 'percent': parseFloat(parseFloat((huawei / total) * 100).toFixed(2)) })
            }
            if (item1[0].xiaomi !== null) {
                xiaomi = parseInt(item1[0].xiaomi) + parseInt(item1[0].xiaomi);
                finaldataAmount.push(parseInt(xiaomi))
                finalDataPercentage.push(parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)))
                finaldataName.push('xiaomi')

                finaldata.push({ 'name': 'xiaomi', 'amount': parseInt(xiaomi), 'percent': parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)) })
            }
            if (item1[0].oppo !== null) {
                oppo = parseInt(item1[0].oppo) + parseInt(item1[0].oppo);
                finaldataAmount.push(parseInt(oppo))
                finalDataPercentage.push(parseFloat(parseFloat((oppo / total) * 100).toFixed(2)))
                finaldataName.push('oppo')

                finaldata.push({ 'name': 'oppo', 'amount': parseInt(oppo), 'percent': parseFloat(parseFloat((oppo / total) * 100).toFixed(2)) })
            }
            if (item1[0].other !== null) {
                other = parseInt(item1[0].other) + parseInt(item1[0].other);
                finaldataAmount.push(parseInt(other))
                finalDataPercentage.push(parseFloat(parseFloat((other / total) * 100).toFixed(2)))
                finaldataName.push('other')

                finaldata.push({ 'name': 'other', 'amount': parseInt(other), 'percent': parseFloat(parseFloat((other / total) * 100).toFixed(2)) })
            }

        })
        return res.status(200).send({
            message: "data",
            data: finaldata,
            name: finaldataName,
            percentage: finalDataPercentage,
            amount: finaldataAmount,
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.postDailySOB = async (req, res, next) => {
    try {
        let days = 1, regWeek = [], finaldata = [], finaldataName = [], finalDataPercentage = [], finaldataAmount = [];
        var month = getStartNoOfMonth(req.body.quarter)
        var data = getdailyweekdays(month)
        data.forEach(async (item, key) => {
            if (item.weekno == req.body.week) {
                while (days <= 7) {
                    var date = moment(item.startofweek, 'YYY-MM-DD').format(`DD MM YYYY`);
                    var dataArray = date.split(/[ ,]/);
                    var check = moment(`${dataArray[1]}${dataArray[0]}${dataArray[2]}`, "MMDDYYYY").add(days - 1, 'day').toDate();
                    var weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
                    var dayName = weekday[check.getDay()];
                    var Months = moment(check, 'YYY-MM-DD').format(`YYYY MM DD`)
                    var dayOnly = Months.split(/[ ,]/);
                    const currWeek = await Feedback.findAll({
                        attributes: [[fn('sum', col('sob_apple')), 'apple'], [fn('sum', col('sob_samsung')), 'samsung'], [fn('sum', col('sob_huawei')), 'huawei'], [fn('sum', col('sob_xiaomi')), 'xiaomi'], [fn('sum', col('sob_oppo')), 'oppo'], [fn('sum', col('sob_other')), 'other'], [fn('sum', col('sob_total')), 'total']],
                        where: getTotalSalesDays(req, check),
                        raw: true,
                    })
                    var obj = {};
                    obj[Months] = currWeek;
                    var apple, samsung, huawei, xiaomi, oppo, other, total;
                    currWeek.map((item1) => {
                        if (item1.total !== null) {
                            total = parseInt(item1.total) + parseInt(item1.total);
                        }
                        if (item1.apple !== null) {
                            apple = parseInt(item1.apple) + parseInt(item1.apple);
                            finaldataName.push('apple')
                            finalDataPercentage.push(parseFloat(parseFloat((apple / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(apple));
                            finaldata.push({ 'name': 'apple', 'amount': parseInt(apple), 'percent': parseFloat(parseFloat((apple / total) * 100).toFixed(2)) })
                        }
                        if (item1.samsung !== null) {
                            samsung = parseInt(item1.samsung) + parseInt(item1.samsung);
                            finaldataName.push('samsung')
                            finalDataPercentage.push(parseFloat(parseFloat((samsung / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(samsung));
                            finaldata.push({ 'name': 'samsung', 'amount': parseInt(samsung), 'percent': parseFloat(parseFloat((samsung / total) * 100).toFixed(2)) })
                        }
                        if (item1.huawei !== null) {
                            huawei = parseInt(item1.huawei) + parseInt(item1.huawei);
                            finaldataName.push('huawei')
                            finalDataPercentage.push(parseFloat(parseFloat((huawei / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(huawei));

                            finaldata.push({ 'name': 'huawei', 'amount': parseInt(huawei), 'percent': parseFloat(parseFloat((huawei / total) * 100).toFixed(2)) })
                        }
                        if (item1.xiaomi !== null) {
                            xiaomi = parseInt(item1.xiaomi) + parseInt(item1.xiaomi);
                            finaldataName.push('xiaomi')
                            finalDataPercentage.push(parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(xiaomi));

                            finaldata.push({ 'name': 'xiaomi', 'amount': parseInt(xiaomi), 'percent': parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)) })
                        }
                        if (item1.oppo !== null) {
                            oppo = parseInt(item1.oppo) + parseInt(item1.oppo);
                            finaldataName.push('oppo')
                            finalDataPercentage.push(parseFloat(parseFloat((oppo / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(oppo));

                            finaldata.push({ 'name': 'oppo', 'amount': parseInt(oppo), 'percent': parseFloat(parseFloat((oppo / total) * 100).toFixed(2)) })
                        }
                        if (item1.other !== null) {
                            other = parseInt(item1.other) + parseInt(item1.other);
                            finaldataName.push('other')
                            finalDataPercentage.push(parseFloat(parseFloat((other / total) * 100).toFixed(2)))
                            finaldataAmount.push(parseInt(other));
                            finaldata.push({ 'name': 'other', 'amount': parseInt(other), 'percent': parseFloat(parseFloat((other / total) * 100).toFixed(2)) })
                        }
                    })

                    days++;
                }
                return res.status(200).send({
                    message: "data",
                    // max_total_sales: Math.max.apply(null, max_sales),
                    datas: finaldata,
                    name: finaldataName,
                    percentage: finalDataPercentage,
                    amount: finaldataAmount,
                })
            }
        })

    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.postQuarterlySOB = async (req, res, next) => {
    try {
        let quarter = ['01', '02', '03', '04'], i = 0;
        var finaldata = [], regWeek = [], allWeek = [], finaldataName = [], finalDataPercentage = [], finaldataAmount = [];
        while (i < quarter.length) {
            var month = getStartNoOfMonth(quarter[i])
            currWeek = getQuarterdata(month);
            regWeek.push({ "data": currWeek })
            i++;
        }
        regWeek.map(async (item, key) => {
            const currWeek = await Feedback.findAll({
                attributes: [[fn('sum', col('sob_apple')), 'apple'], [fn('sum', col('sob_samsung')), 'samsung'], [fn('sum', col('sob_huawei')), 'huawei'], [fn('sum', col('sob_xiaomi')), 'xiaomi'], [fn('sum', col('sob_oppo')), 'oppo'], [fn('sum', col('sob_other')), 'other'], [fn('sum', col('sob_total')), 'total']],
                where: getTotalSalesYear(req, item.data[0].startofweek, item.data[1].endtofweek),
                raw: true,
            })

            var apple, samsung, huawei, xiaomi, oppo, other, total;
            currWeek.map((item1) => {
                if (item1.total !== null) {
                    total = parseInt(item1.total) + parseInt(item1.total);
                }
                if (item1.apple !== null) {
                    apple = parseInt(item1.apple) + parseInt(item1.apple);
                    finaldataName.push('apple')
                    finalDataPercentage.push(parseFloat(parseFloat((apple / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(apple));

                    finaldata.push({ 'name': 'apple', 'amount': parseInt(apple), 'percent': parseFloat(parseFloat((apple / total) * 100).toFixed(2)) })
                }
                if (item1.samsung !== null) {
                    samsung = parseInt(item1.samsung) + parseInt(item1.samsung);
                    finaldataName.push('samsung')
                    finalDataPercentage.push(parseFloat(parseFloat((samsung / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(samsung));

                    finaldata.push({ 'name': 'samsung', 'amount': parseInt(samsung), 'percent': parseFloat(parseFloat((samsung / total) * 100).toFixed(2)) })
                }
                if (item1.huawei !== null) {
                    huawei = parseInt(item1.huawei) + parseInt(item1.huawei);
                    finaldataName.push('huawei')
                    finalDataPercentage.push(parseFloat(parseFloat((huawei / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(huawei));

                    finaldata.push({ 'name': 'huawei', 'amount': parseInt(huawei), 'percent': parseFloat(parseFloat((huawei / total) * 100).toFixed(2)) })
                }
                if (item1.xiaomi !== null) {
                    xiaomi = parseInt(item1.xiaomi) + parseInt(item1.xiaomi);
                    finaldataName.push('xiaomi')
                    finalDataPercentage.push(parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(xiaomi));

                    finaldata.push({ 'name': 'xiaomi', 'amount': parseInt(xiaomi), 'percent': parseFloat(parseFloat((xiaomi / total) * 100).toFixed(2)) })
                }
                if (item1.oppo !== null) {
                    oppo = parseInt(item1.oppo) + parseInt(item1.oppo);
                    finaldataName.push('oppo')
                    finalDataPercentage.push(parseFloat(parseFloat((oppo / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(oppo));

                    finaldata.push({ 'name': 'oppo', 'amount': parseInt(oppo), 'percent': parseFloat(parseFloat((oppo / total) * 100).toFixed(2)) })
                }
                if (item1.other !== null) {
                    other = parseInt(item1.other) + parseInt(item1.other);
                    finaldataName.push('other')
                    finalDataPercentage.push(parseFloat(parseFloat((other / total) * 100).toFixed(2)))
                    finaldataAmount.push(parseInt(other));

                    finaldata.push({ 'name': 'other', 'amount': parseInt(other), 'percent': parseFloat(parseFloat((other / total) * 100).toFixed(2)) })
                }
            })

            if (finaldata.length == 6) {
                return res.status(200).json({
                    status: 200,
                    datas: finaldata,
                    name: finaldataName,
                    percentage: finalDataPercentage,
                    amount: finaldataAmount,
                });
            }
            //  
        })


    } catch (error) {
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