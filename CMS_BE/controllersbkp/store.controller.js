
const Store=require('../models/store.model')
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Customer = require('../models/customerdetail.model');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Store.findAll({
            include: [
                {
                model: Customer,
                attributes: ['id', 'company_name'],
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
        const Data = await Store.findAll({
            where: { id: req.params.storeId, is_deleted: '0' }
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
          if (item.store_name == "") {
            error.push("Store Name is Required")         
         }  
          else if (item.ref_no == "") {            
            error.push("Refernce No is Required") 
          }
          else if (item.contact_no== "") {
            error.push("Contact No is Required")       
        }
          else if (item.latitude == "") {
            error.push("latitude is Required")           
        }
          else if (item.longitude== "") {
            error.push("longitude is Required")          
        }
      })
    return error;
  }
exports.postBulkRecords=async(req,res,next)=>{
    console.log("file data is",req.body)
    console.log("file data is",req.body.created_by)
    console.log("file data is",req.files)
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

                Store.create({        
                    store_name:item.store_name,
                    ref_no:item.ref_no,
                    contact_no:item.contact_no,
                    area:item.area,
                    address:item.address,
                    latitude:item.latitude,
                    longitude:item.longitude,
                    customer_id:req.body.customer_id,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
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
exports.getRecordsByCustomer = async (req, res, next) => {
    try {
        const Data = await Store.findAll({
            where: { customer_id: req.params.storeId, is_deleted: '0' },
            attributes:['id','store_name','ref_no','contact_no','address']
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
    try {
        const Storedetail = await Store.create({
            store_name:req.body.store_name,
            ref_no:req.body.ref_no,
            contact_no:req.body.contact_no,
            area:req.body.area,
            address:req.body.address,
            city:req.body.city,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            customer_id:req.body.customer_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!Storedetail) {
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
exports.getUnassignedStoreRecords = async (req, res, next) => {
    try {
        const Data = await Store.findAll({
            where: { customer_id:null, is_deleted: '0' }
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
exports.updateRecords = async (req, res, next) => {
    try {
        const Storedetails = await Store.update({
            store_name:req.body.store_name,
            ref_no:req.body.ref_no,
            contact_no:req.body.contact_no,
            area:req.body.area,
            address:req.body.product_name,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            customer_id:req.body.customer_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.StoreId } });

        if (!Storedetails) {
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
exports.removeCustomerRecords = async (req, res, next) => {
    try {
        const Storedetails = await Store.update({
            customer_id:req.body.customer_id,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.storeId } });

        if (!Storedetails) {
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

    const StoreId = req.params.id;
    try {
        const details = await Store.update({
            is_deleted: '1'
        },
            { where: { id: StoreId } });
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