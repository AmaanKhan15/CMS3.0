const Customer = require('../models/customerdetail.model');
const Merchand =require('../models/merchandiser.model')
const User=require('../models/users.model')
const StoreGroup =require('../models/storegroup.model')
const helper = require('../config/helpers')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const url = require('url');
const { Op,fn, col } = require('sequelize');

const sequelize = require('../config/database');
function validateCsvData(rows) {
    const dataRows = rows; 
    for (let i = 0; i < dataRows.length; i++) {
      const rowError = validateCsvRow(dataRows[i]);
      if (rowError!="") {
        return `${rowError} on Column ${i + 1}`
      }
    }
    return;
  }
  function validateCsvRow(row) {
      let data=[];
      let error=[];
      data.push(row)
      data.map(item => {
          if (item.proof_no == "") {
            error.push("Proof no is Required"
 )          }
          else if (!Number.isInteger(Number(item.phone_no))) {
            error.push("Invalid Phone No"
     )      }
          else if (item.first_name == "") {            
            error.push("First Name is Required") 
          }
          else if (item.email== "") {
            error.push("Email is Required"
    )       }
          else if (item.username == "") {
            error.push("User Name is Required"
)           }
          else if (item.password== "") {
            error.push("Password is Required"
 )          }
      })
    return error;
  }
  
exports.postBulkRecords=async(req,res,next)=>{
    if(!req.file){
        return res.status(404).json({
            status: 404,
            message: 'No file passed',
        })
    }

    /** Check the extension of the incoming file and 
     *  use the appropriate module
     * 
     */
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }
    try {
        exceltojson({
            input: req.file.path,
            output: null, //since we don't need output.json
            lowerCaseHeaders:true
        }, function(err,result){
            if(err) {
                return res.json({error_code:1,err_desc:err, data: null});
            } 
            const validationError = validateCsvData(result);
            if (validationError) {
              return res.status(403).json({ error: validationError });
            }
            console.log("Result is",result)

            // res.json({error_code:0,err_desc:null, data: result});
            result.map((item,key)=>{

                var hash = crypto.createHash('sha512');
                let data = hash.update(item.password, 'utf-8');
                gen_hash = data.digest('hex'); 
                User.create({
                    email: item.email,
                    user_type: "Merchandiser",
                    username: item.username,
                    password: gen_hash,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                })
                Merchand.create({
                    first_name: item.first_name,
                    middle_name: item.middle_name,
                    last_name: item.last_name,
                    email: item.email,
                    gender: item.gender,
                    area: item.area,
                    phone_no: item.phone_no,
                    city: item.city,
                    proof_no:item.proof_no,
                    address: item.address,
                    username: item.username,
                    password: gen_hash,
                    customer_id: req.body.customer_id,
                    store_group_id: req.body.store_group_id,
                    id_proof: item.id_proof,
                    proof_no: item.proof_no,
                    created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                })                                          
            })
            res.status(200).json({
                status: 200,
                message: 'Post created successfully!',
            });
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Merchand.findAll({
            // include: [
            //   {
            //   model: Customer,
            //   attributes: ['id', 'company_name'],
            // }],                
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
exports.getRecordUnassigned = async (req, res, next) => {
    try {
        const Data = await Merchand.findAll({
            // include: [
            //   {
            //   model: Customer,
            //   attributes: ['id', 'company_name'],
            // }],                
        where: {customer_id:null, is_deleted: '0' }
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
        const Data = await Merchand.findAll({
                include: [
                  {
                  model: Customer,
                  attributes: ['id', 'company_name'],
                }],                
            where: { id: req.params.merchandId, is_deleted: '0' }
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
exports.getRecordsByCustomer = async (req, res, next) => {
    try {
        const Data = await Merchand.findAll({         
            where: { customer_id: req.params.merchandId, is_deleted: '0'},
            include: [
                {
                model: StoreGroup,
                attributes: ['id', 'store_group_name'],
              },
            ]
            // attributes:['first_name','last_name','phone_no','city']
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
    var hash = crypto.createHash('sha512');
    let data = hash.update(req.body.password, 'utf-8');
    gen_hash = data.digest('hex');
    const t = await sequelize.transaction();
    try {
        const Usersdetail = await User.create({
            email: req.body.email,
            user_type: "Merchandiser",
            username: req.body.username,
            password: gen_hash,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        })
        const Merchanddetail = await Merchand.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            area: req.body.area,
            phone_no: req.body.phone_no,
            city: req.body.city,
            address: req.body.address,
            username: req.body.username,
            password: gen_hash,
            customer_id:req.body.customer_id,
            store_group_id: req.body.store_group_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Merchanddetail && Usersdetail) {
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
        const Merchanddetails = await Merchand.update({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            area: req.body.area,
            phone_no: req.body.phone_no,
            city: req.body.city,
            address: req.body.address,
            username: req.body.username,
            password: gen_hash,
            customer_id:req.body.customer_id,
            store_group_id: req.body.store_group_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.merchandId } });

        if (!Merchanddetails) {
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
exports.updateCustomerIdforMerchandiser=async(req,res,next)=>{
    try {
        const users=await User.update({
            merchand_id:req.body.merchand_id
        },{where: { username: req.body.username } });
        const Merchanddetails = await Merchand.update({
            customer_id:req.body.customer_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
        { where: { id: req.params.merchandId } });
        if (!Merchanddetails && users) {
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
exports.updateStoreGroupIdforMerchandiser=async(req,res,next)=>{
    try {
        const users=await User.update({
            store_group_id:req.body.storegroupid,
            customer_id:req.body.customer_id,
        },{where: { merchand_id: req.params.merchandId } });
        const Merchanddetails = await Merchand.update({
            store_group_id:req.body.store_group_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
        { where: { id: req.params.merchandId } });
        if (!Merchanddetails && users) {
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

    const MerchandId = req.params.id;
    try {
        const details = await Merchand.update({
            is_deleted: '1'
        },
            { where: { id: MerchandId } });
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
exports.updateSuperIdRecords = async (req, res, next) => {
    try {
       const Usersdetail = await User.update({
           supervisor_id: req.params.superId,
           created_by: req.body.created_by,
           updated_by: req.body.updated_by,
           created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
       },{
           where: {
               [Op.and]: [
                 { customer_id: req.body.customer_id},
                 { user_type: 'Merchandiser' }
               ]
             } 
           })
       const Promotordetails = await Merchand.update({
           supervisor_id: req.params.superId,
           updated_by: req.body.updated_by,
           updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
       },
           { where: { customer_id: req.body.customer_id } });
       if (!Promotordetails && !Usersdetail) {
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