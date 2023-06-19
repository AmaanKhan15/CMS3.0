const Assignedpromotorstore = require('../../models/store.model');
const Assignedpromotor = require('../../models/promotor.model');
const Customer = require('../../models/customerdetail.model')
const helper = require('../../config/helpers')
const AssignedSupervisor = require("../../models/promotor.model")
const Targettopromotor = require("../../models/assignTarget.model")
const AssignedPromotorSku = require("../../models/promotorskuentry.model")
const Store = require("../../models/store.model")
const { Op, fn, col, literal } = require('sequelize');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const SKU = require('../../models/sku.model');
const sequelize = require('../../config/database');
const Supervisor = require("../../models/supervisor.model")
const Blacklist = require('../../models/blacklisttoken.model');
const User_Login = require('../../models/user_login.model')
const LoginReport = require('../../models/loginrecord.model')
const Promotion = require('../../models/promotions.model')
const Feedback = require('../../models/feedbackpromotor.model')
const Warehouse = require('../../models/warehouse.model')
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

exports.postRecords = async (req, res, next) => {
    try {
        const AssignedStoredetail = await Assignedpromotorstore.findAll({
            where: { id: req.body.store_id, is_deleted: '0' },
            attributes: ['id', 'store_name', 'contact_no', 'address', 'latitude', 'longitude']

        });
        const AssignedPromotor = await AssignedSupervisor.findAll({
            where: { id: req.body.promotor_id, is_deleted: '0' },

            attributes: ['supervisor_id']
        });
        const TotalStore = await Assignedpromotorstore.findAndCountAll({
            where: { id: req.body.store_id, is_deleted: '0' },
            attributes: ['id', 'store_name', 'contact_no', 'address', 'latitude', 'longitude']

        });
        var supervisorId;
        AssignedPromotor.map((item) => {
            supervisorId = item.supervisor_id;
        })
        const AssignedSupervisoretail = await Supervisor.findAll({
            where: { id: supervisorId, is_deleted: '0' },
            attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"], 'id', 'phone_no']
        });
        const Customerdetails = await Customer.findAll({
            where: { id: req.body.Customer_id, is_deleted: '0' },
            attributes: [[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"]]
        });
        const CurrentTarget = await Targettopromotor.findAll({
            where: {
                createdAt: { [Op.gt]: moment().format('YYYY-MM-DD 00:00') },
                createdAt: { [Op.lte]: moment().format('YYYY-MM-DD 23:59') },
                promotor_id: req.body.promotor_id
            },
            attributes: ['sku_name', 'target_desc', 'target_assigned']
        })
        const count = await Assignedpromotor.findAndCountAll({
            where: {
                [Op.and]: [
                    { id: req.body.store_id },
                    { store_id: req.body.store_id }
                ]
            }
        });
        let totalItems = count;
        if (!AssignedStoredetail || !AssignedSupervisoretail || !Customerdetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Fetched successfully!',
            Customer_name: Customerdetails,
            Assigned_Store: AssignedStoredetail,
            Assigned_Supervisor: AssignedSupervisoretail,
            Today_promotor_target: CurrentTarget,
            Store_Count: TotalStore.count
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }

};
exports.postRecordsforCategory = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll
            ({
                // [Op.and]: [
                //     {store_id: {
                //         [Op.like]: '%' + req.body.store_id + '%'
                //     } }, 
                //     {customer_id: req.body.customer_id,
                //     },
                // ],
                where: {
                    [Op.and]: [
                        {
                            store_id: {
                                [Op.like]: '%' + req.body.store_id + '%'
                            }
                        },
                        {
                            customer_id: {
                                [Op.like]: '%' + req.body.customer_id + '%'
                            }
                        },
                        // {customer_id: req.body.customer_id,
                        // },
                    ],
                },
                attributes: ['category', 'id'], group: ['category']
            })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsforProduct = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll
            ({
                where: {
                    store_id: {
                        [Op.like]: '%' + req.body.store_id + '%'
                    },
                    category: req.body.category,
                },
                attributes: ['product_name', 'id'], group: ['product_name'],
                // attributes: ['category', 'sku'], group: ['category', 'sku']
            })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsforSKU = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll
            ({

                where: {
                    store_id: {
                        [Op.like]: '%' + req.body.store_id + '%'
                    },
                    product_name: req.body.product_name,
                },
                attributes: ['sku', 'sku_desc', 'product_price', 'id']
            })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsskuDynamicFields = async (req, res, next) => {
    try {
        const assignment = await SKU.findAll
            ({
                where: {
                    store_id: {
                        [Op.like]: '%' + req.body.store_id + '%'
                    },
                    id: req.body.sku_id,
                },
                attributes: ['product_type']
            })
        if (!assignment) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            data: assignment
        })
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}
exports.postRecordsNewSKU = async (req, res, next) => {
    const t = await sequelize.transaction();
    var locationfind = 0;
    try {
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id, is_deleted: '0'
            }
        })
        // if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
        locationfind = 1;
        const allSku = await AssignedPromotorSku.create({
            sku_id: req.body.sku_id,
            customer_id: req.body.customer_id,
            store_id: req.body.store_id,
            promotor_id: req.body.promotor_id,
            category_id: req.body.category_id,
            sub_category_id: req.body.sub_category_id,
            shelf_qty: req.body.shelf_qty,
            total_sales_qty: req.body.total_sales_qty,
            total_amount: req.body.total_amount,
            damaged_item_qty: req.body.damaged_item_qty,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!allSku) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        // }
        // if (locationfind == 0) {
        //     return res.status(500).json({
        //       code: 500,
        //       message: "You are not on Store Location!!!"
        //     });

        //   };
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    }
    catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Fetch data',
            status: 500
        });
    }
}

exports.logoutpromotor = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    if (!req.headers["authorization"]) {
        return res.status(401).json({
            status: 401,
            message: "You must be Authorized",
        })
    }
    Blacklist.findOne({ where: { token: token } })
        .then((found) => {
            if (found) {
                jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
                    const login = await User_Login.findOne({ where: { user_id: payload.id, token_id: payload.token_id } });
                    login.logged_out = true;
                    login.token_deleted = true;
                    await login.save();
                });
                details = {
                    "Status": "Failure",
                    "Details": 'Token blacklisted. Cannot use this token.'
                }

                return res.status(401).json(details);
            }
            else {
                jwt.verify(req.headers["authorization"], config.secret, async (err, payload) => {
                    if (err) {
                        res.status(403).json({
                            status: 403,
                            message: "Authorization Key is Not Valid..!",
                        })
                    }
                    if (payload) {
                        const login = await User_Login.findOne({ where: { user_id: payload.id, token_id: payload.token_id } })
                        login.logged_out = true;
                        await login.save()
                        const LoggedOutUsers = await LoginReport.update({
                            logout_time: (moment().tz(TZ).utcOffset("+05:30").format()),
                            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                        },
                            { where: { user_id: payload.id } });
                        const blacklist_token = Blacklist.create({
                            token: token
                        });
                        if (blacklist_token || LoggedOutUsers) {
                            return res.status(200).json({
                                status: 200,
                                message: "Token blacklisted. User logged out.",
                            })
                        }

                    }
                });
            }
        });
    // return res.json({message:"Token blacklisted. User logged out."});
}
exports.postPromotionsUpload = async (req, res, next) => {
    const t = await sequelize.transaction();
    var imageUrl1;
    var imageUrl2;
    var imageUrl3;
    var locationfind = 0;
    if (req.files) {
        // console.log("Image 1 is",req.files.image1.path)
        imageUrl1 = req.files.image1[0].path
        imageUrl2 = req.files.image2[0].path
        imageUrl3 = req.files.image3[0].path
    }
    try {
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id, is_deleted: '0'
            }
        })
        if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
            locationfind = 1;
            const Promotiondetail = await Promotion.create({
                image1: imageUrl1,
                image2: imageUrl2,
                image3: imageUrl3,
                store_id: req.body.store_id,
                promotor_id: req.body.promotor_id,
                customer_id: req.body.customer_id,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            }, { transaction: t })
            t.commit();
            if (!Promotiondetail) {
                return res.status(200).json({
                    status: 404,
                    message: 'No data found'
                })
            }
        }
        if (locationfind == 0) {
            return res.status(500).json({
                code: 500,
                message: "You are not on Store Location!!!"
            });

        };
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    } catch (error) {
        t.rollback();
        // helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }

}
exports.postFeedback = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        var storeRecord = await Store.findOne({
            where: {
                id: req.body.store_id, is_deleted: '0'
            }
        })
        // if (distance(req.body.latitude, req.body.longitude, storeRecord.latitude, storeRecord.longitude, "K") <= 0.1) {
        locationfind = 1;
        const Feedbackdetail = await Feedback.create({
            store_id: req.body.store_id,
            promotor_id: req.body.promotor_id,
            customer_id: req.body.customer_id,
            footfall: req.body.footfall,
            footfall_change: req.body.footfall_change,
            invoices: req.body.invoices,
            conversion_rate: req.body.conversion_rate,
            sob_apple: req.body.sob_apple,
            sob_samsung: req.body.sob_samsung,
            sob_huawei: req.body.sob_huawei,
            sob_xiaomi: req.body.sob_xiaomi,
            sob_oppo: req.body.sob_oppo,
            sob_other: req.body.sob_other,
            sob_total: req.body.sob_total,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Feedbackdetail) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        // }
        // if (locationfind == 0) {
        //     return res.status(500).json({
        //       code: 500,
        //       message: "You are not on Store Location!!!"
        //     });

        //   };
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

}
exports.postFootfallChange = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
       
            const currentWeek = await Feedback.findAll({
                attributes: [[fn('sum', col('footfall')), "current_footfall"]],
                where: getCurrentWeekCount(req)
            });
            const lastWeek = await Feedback.findAll({
                attributes: [[fn('sum', col('footfall')), "current_footfall"]],
                where: getLastWeekCount(req)
            });
            var currentWeekCount = 0, lastWeekCount = 0;
            for (var i = 0; i < currentWeek.length; i++) {
                if (currentWeek[i].dataValues['current_footfall'] == null) {
                    currentWeekCount += parseInt(req.body.footfall);
                } else {
                    currentWeekCount = parseInt(currentWeek[i].dataValues['current_footfall']) + parseInt(req.body.footfall);
                }
            }
            for (var i = 0; i < lastWeek.length; i++) {
                if (currentWeek[i].dataValues['current_footfall'] == null) {
                    lastWeekCount += 0;
                } else {
                    lastWeekCount = parseInt(lastWeek[i].dataValues['current_footfall']);
                }
            }

        res.status(200).json({
            status: 200,
            Current_Week_Count: currentWeekCount,
            Last_Week_Count: lastWeekCount,
        });
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }

}
exports.postSummaryData = async (req, res, next) => {
    const t = await sequelize.transaction();
    var selling = [];
    try {
        var BestDeviceId = await AssignedPromotorSku.findAll({
            distinct: 'sku_id',
            attributes: ['sku_id'],
            limit: 1,
            include: [
                {
                    model: SKU,
                    attributes: ['sku_desc'],
                    distinct: 'id',
                }
            ],
        })
        let regWeek = [];
        var max_sales=[];
        let week = 1;
        while (week <= 5) {
            var check = moment(`${req.body.month}01`, "MMDD").add(week - 1, 'week').toDate();
            var Months = moment(check, 'YYY-MM-DD').format('DD MMMM')            
            const currWeek = await AssignedPromotorSku.findAll({
                attributes: [[fn('sum', col('total_sales_qty')), "sales"],[fn('max', col('total_sales_qty')),"max_sales"]],
                where: getRunRateFilter(req,week),
                raw: true,
            })
            var obj = {};           
            max_sales.push(currWeek[0]['max_sales'])
            obj[Months] = currWeek;
            regWeek.push({"weekname":Months,"sales":currWeek[0]['sales']});
            week++;
        } 
        for (var i = 0; i < BestDeviceId.length; i++) {
            var s = BestDeviceId[i].sku_detail['sku_desc'];
            var bestColor = s.substring(s.indexOf('-') + 1);
            var bestDevice = s.substring(0, s.indexOf('-'));
            selling.push({ "Best_Selling_Device": bestDevice })
            selling.push({ "Best_Selling_Color": bestColor })
        }
        res.status(200).json({
            status: 200,
            data: selling,
            runrate_max_sales:Math.max.apply(null, max_sales),
            weekly_runrate: regWeek
        });
    } catch (error) {
        t.rollback();
        // helper.logger.info(error);
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }

}
function getRunRateFilter(req,week) {
    var whereStatement = {};
    whereStatement.createdAt =  {
        [Op.gte]: moment(`${req.body.month}01`, "MMDD").add(week - 1, 'week').toDate(),
        [Op.lt]: moment(`${req.body.month}01`, "MMDD").add(week, 'week').toDate(),
    }    
    return whereStatement;
}
function getCurrentWeekCount(req) {
    var whereStatement = {};
    var curr = new Date;
    var firstday = curr.getDate() - curr.getDay();
    var lastday = firstday + 6;
    var firstDate = new Date(curr.getFullYear(), curr.getMonth(), firstday);
    var lastDate = new Date(curr.getFullYear(), curr.getMonth(), lastday);
    whereStatement.createdAt = {
        [Op.gt]: moment(firstDate).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDate).format('YYYY-MM-DD 23:59')
    }
    return whereStatement;
}
function getLastWeekCount(req) {
    var whereStatement = {};
    var curr = new Date; // get current date
    var lastweeklastday = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week
    var lastweekfirstday = lastweeklastday - 6; // last day is the first day + 6
    var firstDate = new Date(curr.getFullYear(), curr.getMonth(), lastweekfirstday);
    var lastDate = new Date(curr.getFullYear(), curr.getMonth(), lastweeklastday);
    whereStatement.createdAt = {
        [Op.gt]: moment(firstDate).format('YYYY-MM-DD 00:00'),
        [Op.lte]: moment(lastDate).format('YYYY-MM-DD 23:59')
    }
    return whereStatement;
}
function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}
