const AssignedPromotorSku = require("../../models/promotorskuentry.model")
const { Op, fn, col, literal } = require('sequelize');
var moment = require("moment");
const Feedback = require('../../models/feedbackpromotor.model')
const helper = require('../../config/helpers')


function getDateOfWeek(w, y) {
    var sunday = new Date(y, 0, (1 + (w - 1) * 7));
    while (sunday.getDay() !== 0) {
        sunday.setDate(sunday.getDate() - 1);
    }
    console.log("dae is", sunday)
    return sunday;
}
function getNoOfWeek(quarter, week) {
    switch (quarter) {
        case "01":
            return parseInt(week) + parseInt(40)
        case "02":
            return parseInt(week) + parseInt(0)
        case "03":
            return parseInt(week) + parseInt(14)
        case "04":
            return parseInt(week) + parseInt(26)
    }
}
function getNoOfMonth(quarter) {
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
function weekCount(year, month_number) {
    // month_number is in the range 1..12

    // Get the first day of week week day (0: Sunday, 1: Monday, ...)
    var firstDayOfWeek = 0;

    var firstOfMonth = new Date(year, 1 - 1, 1);
    var lastOfMonth = new Date(year, 1, 0);
    var numberOfDaysInMonth = lastOfMonth.getDate();
    var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
    console.log("first week day is", firstOfMonth)
    console.log("numberOfDaysInMonth", lastOfMonth)
    var used = firstWeekDay + numberOfDaysInMonth;

    return Math.ceil(used / 7);
}
function getNoOfWeekByMonth(month) {
    switch (month) {
        case "10":
            return 40
        case "01":
            return 01
        case "04":
            return 14
        case "07":
            return 26
    }
}
function getWeeksStartAndEndInMonth(month, year, _start) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
        d = new Date();
    console.log("The current month is " + monthNames[d.getMonth()]);
    let weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();
    var c = Date()
    let start = 1;
    let end = 7 - firstDate.getDay();
    if (_start == 'monday') {
        if (firstDate.getDay() === 0) {
            end = 1;
        } else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        var businessWeekEnd = end - 2
        if (businessWeekEnd > 0) {
            if (businessWeekEnd > start) {
                weeks.push({ start: start, end: businessWeekEnd });
            }
            else {
                //Check for last day else end date is within 5 days of the week.
                weeks.push({ start: start, end: end });
            }
        }
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }

    weeks.forEach(week => {
        var _s = parseInt(week.start, 10) + 1,
            _e = parseInt(week.end, 10) + 1;
        console.log(new Date(year, month, _s).toJSON().slice(0, 10).split('-').reverse().join('/') + " - " + new Date(year, month, _e).toJSON().slice(0, 10).split('-').reverse().join('/'));
        console.log(((_e - _s) + 1) * 8)
    });
    console.log("array pusged is", weeks)
    return weeks;
}
function getWeeksInMonth(year, month){

    var monthStart     = moment().year(year).month(month).date(1);
    var monthEnd       = moment().year(year).month(month).endOf('month');
    var numDaysInMonth = moment().year(year).month(month).endOf('month').date();

    //calculate weeks in given month
    var weeks      = Math.ceil((numDaysInMonth + monthStart.day()) / 7);
    var weekRange  = [];
    var weekStart = moment().year(year).month(month).date(1);
    var i=0;

    while(i<weeks){
        var weekEnd   = moment(weekStart);


        if(weekEnd.endOf('week').date() <= numDaysInMonth && weekEnd.month() == month) {
            weekEnd = weekEnd.endOf('week').format('LL');
        }else{
            weekEnd = moment(monthEnd);
            weekEnd = weekEnd.format('LL')
        }

        weekRange.push({
            'weekStart': weekStart.format('LL'),
            'weekEnd': weekEnd
        });


        weekStart = weekStart.weekday(7);
        i++;
    }

    return weekRange;
}
function getWeeksInMonth(year, month) {
    const weeks = [];

    let FirstDate = new Date(year, month, 1);
    let lastDate = new Date(year, parseInt(month),0);
    let numDays = lastDate.getDate();
    let DaysofWeekCount = FirstDate.getDate();
    for (let date = 1; date <= numDays; date++) {
        if (DaysofWeekCount === 0 || weeks.length === 0) {
            weeks.push([]);
        }
        weeks[weeks.length - 1].push(date);
        DaysofWeekCount = (DaysofWeekCount + 1) % 7;
    }
    // if (weeks[0].length < 7) {
    //     const beforeIdex = addMonth(year, month - 1, 1);
    //     const indexRefactor = [...beforeIdex, ...weeks[0]];
    //     weeks[0] = indexRefactor;
    // }
    // if (weeks[weeks.length - 1].length < 7) {
    //     const afterIndex1 = addMonth(year, month + 1, 1);
    //     const indexRefactor = [...[weeks.length - 1], ...afterIndex1];
    //     weeks[weeks.length ] = indexRefactor;
    // }
    return weeks
        .filter((w) => !!w.length)
        .map((w) => (
            {
            ismonth:month,
            start: w[0],
            end: w[w.length - 1],
            dates: w
        }))

}

const addMonth = (year, month, flag) => {
    const weeks = [];
    let firstDate = new Date(year, month, 1);
    let lastDate = new Date(year, month + 1, 0);
    let numdays = lastDate.getDate();
    let DaysofWeekCount = firstDate.getDate();
    for (let date = 1; date <= numdays; date++) {
        if (DaysofWeekCount === 0 || weeks.length === 0) {
            weeks.push([]);
        }
        weeks[weeks.length - 1].push(date);
        DaysofWeekCount = (DaysofWeekCount + 1) % 7;
    }
    if (flag === 0) {
        return weeks[0];
    }
    if (flag === 1) {
        return weeks[weeks.length - 1]
    }
    //  return [];
}
function getWeeksInMonth(month_number, year) {
    console.log("year - "+year+" month - "+month_number+1);
  
    var day = 0;
    var firstOfMonth = new Date(year, month_number, 1);
    var lastOfMonth = new Date(year, parseInt(month_number)+1, 0);
  
    if (firstOfMonth.getDay() == 0) {
      day = 2;
      firstOfMonth = firstOfMonth.setDate(day);
      firstOfMonth = new Date(firstOfMonth);
    } else if (firstOfMonth.getDay() != 1) {
      day = 9-(firstOfMonth.getDay());
      firstOfMonth = firstOfMonth.setDate(day);
      firstOfMonth = new Date(firstOfMonth);
    }
  
    var days = (lastOfMonth.getDate() - firstOfMonth.getDate())+1
    return Math.ceil( days / 7);              
  }
  function showWeeks(year, month) {

    let firstWeek = moment(new Date(year,month,1)).isoWeek();
    let lastWeek = moment(new Date(year,month+1,0)).isoWeek();
console.log("first date is",firstWeek)
console.log("Last date is",lastWeek)
    let out = [firstWeek];
    if (firstWeek === 52 || firstWeek === 53) {
      firstWeek=0;
    }

    for ( let i = firstWeek+1; i<= lastWeek; i++) {
      out.push(i);
    }

    return out;
  }
exports.postWeeklyTotalSales = async (req, res, next) => {
    try {
    //   const firstDayOfMonth = moment(`${ 2016}-${ 10 }`, 'YYYY-MM-DD');
      var firstWeek =moment(`${ 2022}-${ 10 }`, 'YYYY-MM-DD').startOf('week').format('DD-MM-YYYY');
      var lastWeek   = moment(`${ 2022}-${ 10 }`, 'YYYY-MM-DD').endOf('week').format('DD-MM-YYYY');
      var dataArray = lastWeek.split(/[ ,]/);
console.log("month is",dataArray[0])
      let secoWeek = moment(new Date(lastWeek)).isoWeek().format('DD-MM-YYYY');


       return res.status(200).send({
            message: "data",
            // data: dat,
            // week:firstWeek,
            start:firstWeek,
            end:lastWeek,
            se:secoWeek
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
// exports.postWeeklyTotalSales = async (req, res, next) => {
//     try {
//         let regWeek = [];
//         var max_sales = [];
//         let week = 1;
//         var noofmonth = getNoOfMonth(req.body.quarter)
//         console.log("no of month are",noofmonth)
//         // var noofweek = getNoOfWeekByMonth(noofmonth); 
//         // var weekcount=weekCount(req.body.year,noofmonth)
//         // 
//         var firstOfMonth = new Date(req.body.year, noofmonth-1, 1);
//         console.log("first adte is",firstOfMonth)
//         while (week <= 13) {

//             var date = moment(firstOfMonth, 'YYY-MM-DD').format(`DD MM YYYY`);
//             console.log("before weeks add",date) 
//             var dataArray = date.split(/[ ,]/);
//              // var check = moment(`${noofmonth}01${req.body.year}`, "MMDDYYYY").add(week - 1, 'week').toDate();
//             // var Months = moment(check, 'YYY-MM-DD').format('DD MM YYYY')
//             // const currmonth = await AssignedPromotorSku.findAll({
//             //     attributes: [[fn('sum', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
//             //     where: getQuarterFilter(req,week, Months),
//             //     raw: true,
//             // })
//             // var obj = {};
//             // obj[Months] = currmonth;
//             // if (currmonth[0]['sales'] == null) {
//             //     max_sales.push(0)
//             //     regWeek.push({ "weekname": `week ${week} ${Months}`, "sales": 0 });
//             // } else {
//             //     max_sales.push(currmonth[0]['max_sales'])
//             //     regWeek.push({ "weekname": `week ${week} ${Months} `, "sales": currmonth[0]['sales'] });
//             // }
//             var check = moment(`${firstOfMonth}`, "MMDDYYYY").add(week -1, 'week').toDate();
//             var check =moment(firstOfMonth, 'DD-MM-YYYY').add(week -1, 'week').toDate();
//             console.log("after weeks add",check) 
//             week++;
//         }

//         return res.status(200).json({
//             status: 200,
//             // max_total_sales: Math.max.apply(null, max_sales),
//             // data: regWeek,
//             // Total_week:weekcount
//         });
//     } catch (error) {
//         return res.status(500).send({
//             message: 'Unable to Post data',
//             status: 500,
//             is_error: error
//         });
//     }

// }

exports.posttotalSalesDaily = async (req, res, next) => {
    try {
        let regWeek = [];
        var noofweek, max_sales = [];
        let days = 1;
        var noofweek = getNoOfWeek(req.body.quarter, req.body.week);
        while (days <= 7) {
            var date = moment(getDateOfWeek(noofweek, req.body.year), 'YYY-MM-DD').format(`DD MM YYYY`);
            var dataArray = date.split(/[ ,]/);
            var check = moment(`${dataArray[1]}${dataArray[0]}${dataArray[2]}`, "MMDDYYYY").add(days - 1, 'day').toDate();
            var weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
            var dayName = weekday[check.getDay()];
            var Months = moment(check, 'YYY-MM-DD').format(`YYYY MM DD`)
            var dayOnly = Months.split(/[ ,]/);
            const currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('sum', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
                where: getTotalSalesDays(req, Months),
                raw: true,
            })
            var obj = {};
            obj[Months] = currWeek;
            if (currWeek[0]['sales'] == null) {
                max_sales.push(0)
                regWeek.push({ "day": `${dayOnly[0] + " " + " " + dayName}`, "sales": 0 });
            } else {
                max_sales.push(currWeek[0]['sales'])
                regWeek.push({ "day": `${dayOnly[0] + " " + " " + dayName}`, "sales": currWeek[0]['sales'] });
            }
            days++;
        }
        return res.status(200).json({
            status: 200,
            max_total_sales: Math.max.apply(null, max_sales),
            data: regWeek
        });
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
        let regWeek = [];
        var max_sales = [];
        let month = 1;
        while (month <= 12) {
            var check = moment(`0101${req.body.year}`, "MMDDYY").add(month - 1, 'month').toDate();
            var Months = moment(check, 'YYY-MM-DD').format('DD MMMM')
            console.log("data is", Months)
            const currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('sum', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
                where: getTotalSalesYear(req, month),
                raw: true,
            })
            var obj = {};
            obj[Months] = currWeek;
            if (currWeek[0]['sales'] == null) {
                regWeek.push({ "weekname": Months, "sales": 0 });
            } else {
                max_sales.push(currWeek[0]['sales'])

                regWeek.push({ "weekname": Months, "sales": currWeek[0]['sales'] });
            }
            month++;
        }
        return res.status(200).json({
            status: 200,
            max_total_sales: Math.max.apply(null, max_sales),
            data: regWeek
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500,
            is_error: error
        });
    }

}
exports.postSummeryChartWeekly = async (req, res, next) => {
    try {
        let regWeek = [];
        var max_sales = [];
        let week = 1;
        var currWeek;
        while (week <= 5) {
            var check = moment(`${req.body.month}01`, "MMDD").add(week - 1, 'week').toDate();
            var Months = moment(check, 'YYY-MM-DD').format('DD MMMM')
            currWeek = await Feedback.findAll({
                attributes: [[fn('sum', col('footfall_change')), "change_percentage_footfall"]],
                where: getRunRateFilter(req, week),
                raw: true,
            })
            var obj = {};
            obj[Months] = currWeek;
            if (currWeek[0]['sales'] == null) {
                regWeek.push({ "weekname": Months, "change_percentage_footfall": 0 });
            } else {
                regWeek.push({ "weekname": Months, "change_percentage_footfall": currWeek[0]['change_percentage_footfall'] });
            }
            week++;
        }
        return res.status(200).json({
            status: 200,
            runrate_max_sales: currWeek,
            weekly_runrate: regWeek
        });
    } catch (error) {
        // t.rollback();
        // helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500,
            is_error: error
        });
    }

}
exports.getWeeklyRunrate = async (req, res, next) => {
    let regWeek = [];
    var max_sales = [];
    let week = 1;
    try {
        while (week <= 13) {
            var check = moment(`${req.body.month}01${req.body.year}`, "MMDDYY").add(week - 1, 'week').toDate();
            var Months = moment(check, 'YYY-MM-DD').format('DD MMMM')
            const currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('sum', col('total_sales_qty')), "sales"], [fn('max', col('total_sales_qty')), "max_sales"]],
                where: getRunRateFilter(req, week),
                raw: true,
            })
            var obj = {};
            max_sales.push(currWeek[0]['max_sales'])
            obj[Months] = currWeek;
            if (currWeek[0]['sales'] == null) {
                regWeek.push({ "weekname": Months, "sales": 0 });
            } else {
                regWeek.push({ "weekname": Months, "sales": currWeek[0]['sales'] / 7 });
            }
            week++;
        }
        return res.status(200).json({
            status: 200,
            weekly_runrate: regWeek
        });
    } catch (error) {
        // t.rollback();
        // helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500,
            is_error: error
        });
    }


}
function getQuarterFilter(req, week, month) {
    var whereStatement = {};
    var dataArray = month.split(/[ ,]/);
    if (req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if (req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if (req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    // whereStatement.createdAt = {
    //     [Op.gt]: moment(month, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    //     [Op.lte]: moment(month, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    // }
    whereStatement.createdAt = {
        [Op.gte]: moment(`${month}`, "DDMMYYYY").format('YYYY-MM-DD'),
        [Op.lt]: moment(`${month}`, "DDMMYYYY").format('YYYY-MM-DD'),
    }
    return whereStatement;
}
function getTotalSalesYear(req, month) {
    var whereStatement = {};
    whereStatement.createdAt = {
        [Op.gte]: moment(`${req.body.month}01`, "MMDD").add(month - 1, 'month').toDate(),
        [Op.lt]: moment(`${req.body.month}01`, "MMDD").add(month, 'month').toDate(),
    }
    return whereStatement;
}
function getTotalSalesDays(req, month) {
    var whereStatement = {};
    if (req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if (req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if (req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    whereStatement.createdAt = {
        [Op.gt]: moment(month, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        [Op.lte]: moment(month, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    }
    // whereStatement.createdAt = {
    //     [Op.gt]: moment(firstDate).format('YYYY-MM-DD 00:00'),
    //     [Op.lte]: moment(firstDate).format('YYYY-MM-DD 23:59')
    // }
    return whereStatement;
}
