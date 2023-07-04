const Hrdetails = require('../../models/hr.model');
const helper = require('../../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const sequelize = require('../../config/database');
exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Hrdetails.findAll({                          
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
exports.getShortlistRecords = async (req, res, next) => {
    try {
        const Data = await Hrdetails.findAll({                          
        where: {  is_deleted: '0' ,short_list:'1'}
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

exports.getRecordsById = async (req, res, next) => {
    try {
        const Data = await Hrdetails.findAll({
            where: { role: req.params.role, is_deleted: '0' ,short_list:'0'}
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
    const t = await sequelize.transaction();
    if(!req.file){
        return res.status(404).json({
            status: 404,
            message: 'No file passed',
        })
    }
    try {
        const Hrdetailsdetail = await Hrdetails.create({
            full_name: req.body.full_name,           
            mobile_no: req.body.mobile_no,           
            location: req.body.location,           
            email: req.body.email,           
            dob: req.body.dob,           
            address: req.body.address,           
            profile_tag: req.body.profile_tag,           
            resume: req.file.filename,           
            resume_head: req.body.resume_head,           
            profile_summary: req.body.profile_summary,           
            role: req.body.role,           
            qualification: req.body.qualification,           
            college: req.body.college,           
            key_skill: req.body.key_skill, 
            experience:req.body.experience,
	        company_name:req.body.company_name,
	        summary:req.body.summary   ,                           
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Hrdetailsdetail) {
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
        const Hrdetailsdetails = await Hrdetails.update({
            full_name: req.body.full_name,           
            mobile_no: req.body.mobile_no,           
            location: req.body.location,           
            email: req.body.email,           
            dob: req.body.dob,           
            address: req.body.address,           
            profile_tag: req.body.profile_tag,           
            resume: req.body.resume,           
            resume_head: req.body.resume_head,           
            profile_summary: req.body.profile_summary,           
            role: req.body.role,           
            qualification: req.body.qualification,           
            college: req.body.college,           
            key_skill: req.body.key_skill,                               
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.HrdetailsId } });

        if (!Hrdetailsdetails) {
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

    const HrdetailsId = req.params.id;
    try {
        const details = await Hrdetails.update({
            is_deleted: '1'
        },
            { where: { id: HrdetailsId } });
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
exports.shortlistRecords = async (req, res, next) => {

    const HrdetailsId = req.params.id;
    try {
        const details = await Hrdetails.update({
            short_list: '1'
        },
            { where: { id: HrdetailsId } });
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
exports.GetshortlistRecords = async (req, res, next) => {
    try {
        const Data = await Hrdetails.findAll({                          
        where: {  short_list: '1' }
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
};