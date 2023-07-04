const Customer = require('../models/customerdetail.model');
const Promotor =require('../models/promotor.model')
const Merchand =require('../models/merchandiser.model')
const Supervisor =require('../models/supervisor.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
var crypto = require('crypto');
const User =require('../models/users.model')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
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
                    user_type: "Supervisor",
                    username: item.username,
                    password: gen_hash,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
                })
                Supervisor.create({
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

        const Data = await Supervisor.findAll({
            include: [
              {
              model: Customer,
              attributes: ['id', 'company_name'],
            },
            {
                model: Promotor,
                attributes: ['id'],
            },
            {
                model: Merchand,
                attributes: ['id'],
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
exports.getUnassignedSupervisor = async (req, res, next) => {
    try {

        const Data = await Supervisor.findAll({
            include: [
              {
              model: Customer,
              attributes: ['id', 'company_name'],
            },
            {
                model: Promotor,
                attributes: ['id'],
            },
            {
                model: Merchand,
                attributes: ['id'],
            }],                
        where: {  is_deleted: '0',customer_id:null }
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
        const Data = await Supervisor.findAll({
            include: [
                {
                model: Customer,
                attributes: ['id', 'company_name'],
              },
              {
                  model: Promotor,
                  attributes: ['id'],
              },
              {
                  model: Merchand,
                  attributes: ['id'],
              }],                   
            where: { id: req.params.supervisorId, is_deleted: '0' }
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
            user_type: "Promotor",
            username: req.body.username,
            password: gen_hash,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        })
        const Supervisordetail = await Supervisor.create({
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
            promotor_id: req.body.promotor_id,
            marchand_id: req.body.marchand_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Supervisordetail) {
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
        const Supervisordetails = await Supervisor.update({
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
            promotor_id: req.body.promotor_id,
            marchand_id: req.body.marchand_id,
            id_proof: req.body.id_proof,
            proof_no: req.body.proof_no,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.supervisorId } });

        if (!Supervisordetails) {
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
exports.updateSupervisorByCustomer=async(req,res,next)=>{
    try {
        const Data = await Supervisor.findAll({                               
            where: { id: req.params.supervisorId, is_deleted: '0' }
        });
        var updatedata=[];
        var allCustomerid=[];
       for(var i=0;i<Data.length;i++){
            console.log("data from supervisor is",Data[i].customer_id)
            if(Data[i].customer_id!=null){
                allCustomerid.push(Data[i].customer_id)                                     
            }
        }
        allCustomerid.push(req.body.customer_id)
        var custId=allCustomerid.join()
        const Supervisordetails = await Supervisor.update({
            customer_id:custId,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
        { where: { id: req.params.supervisorId } });
            updatedata.push(Supervisordetails) 
 
        if (!Data) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Updated Successfully',
            data:allCustomerid
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

    const SupervisorId = req.params.id;
    try {
        const details = await Supervisor.update({
            is_deleted: '1'
        },
            { where: { id: SupervisorId } });
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