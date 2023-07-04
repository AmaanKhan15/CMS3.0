const Customer = require('../models/customerdetail.model');
const Promotor =require('../models/promotor.model')
const Store =require('../models/store.model')
const helper = require('../config/helpers')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const url = require('url');
const User=require('../models/users.model')
const sequelize = require('../config/database');
const { Op,fn, col } = require('sequelize');
const AssignedPromotorSku=require('../models/assignedpromotor.model')
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
//           if (item.proof_no == "") {
//             error.push("Proof no is Required"
//  )          }
//           else if (!Number.isInteger(Number(item.phone_no))) {
//             error.push("Invalid Phone No"
//      )      }
//           else if (item.first_name == "") {            
//             error.push("First Name is Required") 
//           }
//           else if (item.email== "") {
//             error.push("Email is Required"
//     )       }
//           if (item.username == "") {
//             error.push("User Name is Required"
// )           }
//           else if (item.password== "") {
//             error.push("Password is Required"
//  )          }
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
                    user_type: "Promotor",
                    username: item.username,
                    password: gen_hash,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                })
                Promotor.create({
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
                    store_id: item.store_id,
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
        const Data = await Promotor.findAll({
            include: [
              {
              model: Customer,
              attributes: ['id', 'company_name','email'],
              where: {  is_deleted: '0' }
            },
            {
                model: Store,
                attributes: ['id', 'store_name'],
            }],                
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

exports.getRecordsById = async (req, res, next) => {
    try {
        const Data = await Promotor.findAll({
            include: [
                {
                model: Customer,
                attributes: ['id', 'company_name'],
              },
              {
                  model: Store,
                  attributes: ['id', 'store_name'],
              }],                
            where: { id: req.params.promotorId, is_deleted: '0' }
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
        const Data = await Promotor.findAll({
                         
            where: { customer_id: req.params.promotorId, is_deleted: '0',store_id:null },
            include: [
                {
                model: Store,
                attributes: ['id', 'store_name'],
              },
            ]
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
exports.getRecordsByCustToPromotor = async (req, res, next) => {
    try {
        const Data = await Promotor.findAll({
                         
            where: { customer_id: req.params.promotorId, is_deleted: '0'},
            include: [
                {
                model: Store,
                attributes: ['id', 'store_name'],
              },
              {
                model: Customer,
                attributes: ['id', 'company_name','email'],
              }
            ]
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
exports.getRecordsOfUnassignedPromotor = async (req, res, next) => {
    try {
        const Data = await Promotor.findAll({

            where: { customer_id: null, is_deleted: '0' },
            // include: [
            //     {
            //     model: Store,
            //     attributes: ['id', 'store_name'],
            //   },
            // ]
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
exports.updateCustomerIdforPromotor=async(req,res,next)=>{
    try {
       const users=await User.update({
            promotor_id:req.params.promotorId,
            customer_id:req.body.customer_id
        },{where: { username: req.body.username } });
       const Merchanddetails = await Promotor.update({
            customer_id:req.body.customer_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
        { where: { id: req.params.promotorId } });
        if (!Merchanddetails && !users) {
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
exports.updateStoreGroupIdforPromotor=async(req,res,next)=>{
    try {
        const users=await User.update({
            store_id:req.body.store_id,
        },{where: { promotor_id: req.params.promotorId } });
        const Merchanddetails = await Promotor.update({
            store_id:req.body.store_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
        { where: { id: req.params.promotorId } });
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
exports.postRecords = async (req, res, next) => {
    var hash = crypto.createHash('sha512');
    let data = hash.update(req.body.password, 'utf-8');
    gen_hash = data.digest('hex');
    const t = await sequelize.transaction();
    try {
        const Usersdetail = await User.create({
            email: req.body.email,
            user_type: "Promotor",
            username: req.body.username,
            password: gen_hash,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        })
        const Promotordetail = await Promotor.create({
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
            store_id: req.body.store_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Promotordetail && Usersdetail) {
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
        const Usersdetail = await User.update({
            email: req.body.email,
            user_type: "Promotor",
            username: req.body.username,
            password: gen_hash,
            customer_id:req.body.customer_id,
            store_id: req.body.store_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },{ where: { promotor_id: req.params.promotorId } })
        const Promotordetails = await Promotor.update({
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
            store_id: req.body.store_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.promotorId } });

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
exports.updateAssignedPromotors = async (req, res, next) => {
    try {
        console.log("promotor id",req.params.promotorId)
        console.log("Customer id",req.params.customerId)
        const Usersdetail = await User.update({
            user_type: "Promotor",
            customer_id:req.body.customer_id,
            promotor_id:req.body.promotor_id,
            store_id:req.body.store_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, {where: {
            [Op.and]: [
                { promotor_id:  req.params.promotorId},
                { customer_id: req.params.customerId },
            ]}}
            );
        const Promotordetails = await Promotor.update({
            customer_id:req.body.customer_id,
            store_id:req.body.store_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
       {where: {
            [Op.and]: [
                { id:  req.params.promotorId},
                { customer_id: req.params.customerId},
                { username: req.body.username },
            ]}}
            );

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
exports.deleteRecords = async (req, res, next) => {

    const PromotorId = req.params.id;
    try {
        const details = await Promotor.update({
            is_deleted: '1'
        },
            { where: { id: PromotorId } });
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
exports.promotorSingleReport=async(req,res,next)=>{
    try {
        const Data = await Promotor.findAll({
            include: [
              {
                  model: Store,
                  attributes: ['id', 'store_name'],
              }],                
            where: { id: req.params.promotorId, is_deleted: '0' }
        });
        let allStore=[],listpromotorList=[];
        Data.map((item)=>{
            allStore.push({id:item.id,Name:item.store_name})
        })
        for (i = 0; i < allStore.length; i++) {
            const list_promotor = await AssignedPromotorSku.findAndCountAll({ 
                           
            where: { store_id:allStore[i].id, is_deleted: '0' },

        });
        listpromotorList.push({sales:list_promotor})
    }
        if (!Data ) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            store: Data,
            sales:listpromotorList
        });
    } catch (error) {

        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    } 
}
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
                  { user_type: 'Promotor' }
                ]
              } 
            })
        const Promotordetails = await Promotor.update({
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
