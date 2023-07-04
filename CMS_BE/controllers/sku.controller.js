const SKU = require('../models/sku.model');
const SKUThumb = require('../models/skuthumb.model');
const helper = require('../config/helpers')
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Customer = require('../models/customerdetail.model');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const { Op,fn, col } = require('sequelize');

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
    //   data.map(item => {
    //       if (item.sku_quantity == "") {
    //         error.push("SKU Quantity  is Required")         
    //      }  
    //       else if (item.category == "") {            
    //         error.push("Category is Required") 
    //       }
    //       else if (item.product_name== "") {
    //         error.push("Product Name is Required")       
    //     }
    //       else if (item.referance_no == "") {
    //         error.push("Reerence No is Required")           
    //     }
    //       else if (item.sku== "") {
    //         error.push("SKU is Required")          
    //     }
    //   })
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

                 SKU.create({
                    sku: item.sku,
                    sku_qty: item.sku_quantity,
                    ref_no: item.referance_no,
                    sku_desc: item.sku_description,
                    category: item.category,
                    product_name: item.product_name,
                    product_desc: item.product_description,
                    product_price: item.product_price,
                    customer_id: req.body.customer_id,
                    store_id: req.body.store_id,
                    product_type:req.body.product_type,
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
        const Data = await SKU.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'company_name'],
                }],
                
        });
        // const Data = await SKU.findAll({attributes: ['category', 'sku'], group: ['category', 'sku']});

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
exports.skubyCustomerController = async (req, res, next) => {
    try {
        const Data = await SKU.findAll({
            // where: { customer_id:  req.params.id}
            where: {customer_id: {
                [Op.like]: '%' + req.params.id + '%'
            }},
        });
        // const Data = await SKU.findAll({attributes: ['category', 'sku'], group: ['category', 'sku']});

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
        const Data = await SKU.findAll({
            where: { id: req.params.skuId, is_deleted: '0' }
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
        const SKUdetail = await SKU.create({
            sku: req.body.sku,
            sku_qty: req.body.sku_qty,
            ref_no: req.body.ref_no,
            sku_desc: req.body.sku_desc,
            category: req.body.category,
            product_name: req.body.product_name,
            product_desc: req.body.product_desc,
            product_price: req.body.product_price,
            customer_id: req.body.customer_id,
            store_id: req.body.store_id,
            product_type: req.body.product_type,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();
        if (!SKUdetail) {
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
    try {
        const SKUdetails = await SKU.update({
            sku: req.body.sku,
            sku_qty: req.body.sku_qty,
            ref_no: req.body.ref_no,
            sku_desc: req.body.sku_desc,
            category: req.body.category,
            product_name: req.body.product_name,
            product_desc: req.body.product_desc,
            product_price: req.body.product_price,
            customer_id: req.body.customer_id,
            store_id: req.body.store_id,
            product_type:req.body.product_type,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.SKUId } });

        if (!SKUdetails) {
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

    const SKUId = req.params.id;
    try {
        const details = await SKU.update({
            is_deleted: '1'
        },
            { where: { id: SKUId } });
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
exports.getStoresSku=async(req,res,next)=>{
    try {
        const Data = await SKU.findAll({
            where: { 
            store_id: {
                [Op.like]: '%' + req.body.store_id + '%'
            },
            customer_id:req.body.customer_id,            
        }
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