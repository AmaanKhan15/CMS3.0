const Customer = require('../../models/customerdetail.model');
const helper = require('../../config/helpers')
var moment = require("moment");
const Warhouse = require('../../models/warehouse.model');
const Store = require('../../models/store.model');
const SKU = require('../../models/sku.model');
const AssignedPromotorSku =require("../../models/promotorskuentry.model")
const { Op,fn,col } = require('sequelize');
const Promotor = require('../../models/promotor.model');
const Merchandiser=require('../../models/merchandiser.model');
const Warehouse = require('../../models/warehouse.model');
exports.getFilteredData = async (req, res, next) => {
    try {
        const filteredData = await AssignedPromotorSku.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, {
                    model: Promotor,
                    attributes: ['id', 'first_name'],
                },
                 {
                    model: SKU,
                    attributes: ['id', 'sku_qty'],
                },
                {
                    model: Customer,                    
                    attributes: ['id', 'company_name'],
                },
            ],
            where:getFilterConditions(req),
            attributes: ['id','damaged_item_qty', 'total_sales_qty','shelf_qty']
        });
       
      
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getFilteredDataMerchandiser = async (req, res, next) => {
    try {
        const filteredData = await Warhouse.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }, {
                    model: Merchandiser,
                    attributes: ['id', 'first_name'],
                },
                {
                    model: SKU,
                    attributes: ['id', 'sku_qty'],
                },
                {
                    model: Customer,
                    attributes: ['id', 'company_name'],
                },
            ],
            where:getFilterConditions(req),
            attributes: ['id','damage_qty', 'total_sales_qty','qty_warehouse','total_amt']
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getSingleMerchandiser=async(req,res,next)=>{
    try {
        const filteredData = await Warhouse.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                }
            ],
            where:{merchand_id:req.body.merchand_id},
            // attributes: ['id','damage_qty', 'total_sales_qty','qty_warehouse','total_amt'],
            // [sequelize.fn('sum', sequelize.col('total_amt')), 'total_amount'],
            // attributes: [
            //     'id','damage_qty', 'total_sales_qty','qty_warehouse',
            //     [sequelize.fn('sum', sequelize.col('total_amt')), 'total_amount'],
            //   ],
              attributes: [ [fn('sum', col('total_amt')), "total_amount"],'id','damage_qty', 'total_sales_qty','qty_warehouse'],
            group: ['store_id']
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}

exports.getCategoryCitySales=async(req,res,next)=>{
    try {
        const filteredData = await SKU.findAll({
            where: getFilterConditions(req),
            attributes:['category','id'],
            group: ['category']
        })  
        
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getProductCitySales=async(req,res,next)=>{
    try {
        const filteredData = await SKU.findAll({
            where: getFilterConditions(req),
            attributes:['product_name'],
            group: ['product_name']
        })  
        
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getSKUCitySales=async(req,res,next)=>{
    try {
        const filteredData = await SKU.findAll({
            where: getFilterConditions(req),
            attributes:['sku','sku_desc','id'],
            group: ['sku_desc']
        })  
        
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}

exports.getSalesUnit=async(req,res,next)=>{
    try {
        const filteredData = await Warhouse.findAll({
                include: [{
                    model: Store,
                    attributes: ['id', 'store_name'],
                },{
                    model:Promotor,
                    attributes:['id','first_name','last_name']
                }
            ],                        
            where:getFilterConditions(req),
            // {
                // created_on: {
                // [Op.between]: [ req.body.startdate, req.body.enddate]                
                // },
            //     promotor_id:req.body.promotor_id,
            // },            
            attributes: ['id', 'total_sales_qty','damage_qty'],
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getCitySalesUnit=async(req,res,next)=>{
    try {
        const filteredData = await Warehouse.findAll({
                                  
            where:getFilterConditions(req),
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
        ],  
            attributes:['id', [fn('sum', col('total_sales_qty')), "unit_sales"]]
         
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getPromotorSalesQty=async(req,res,next)=>{
    try {
        const filteredData = await Warehouse.findAll({
                                  
            where:getFilterConditions(req),
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
        ],  
            attributes:['id', [fn('sum', col('total_sales_qty')), "unit_sales"]]
         
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getPromotorSalesAmt=async(req,res,next)=>{
    try {
        const filteredData = await Warehouse.findAll({
                                  
            where:getFilterConditions(req),
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
        ],  
            attributes:['id', [fn('sum', col('total_amt')), "unit_sales"]]
         
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getStoreByCustomer=async(req,res,next)=>{
    try {
        const filteredData = await Store.findAll({                                  
            where:{customer_id:req.params.custId},
            attributes:['id', "store_name"],
            group: ['store_name']         
        });             
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getPromotorCompare=async(req,res,next)=>{
    try {
        const proids=req.body.promotor_id;
        const alldata=[]
        console.log(req.body.promotor_id)
        // proids.map(async(item)=>{  
        for(var j= 0;j< proids.length ; j++){
            console.log("Promotor isd is",proids[j])
        var filteredData = await Warehouse.findAll({                                  
            where:{customer_id:req.body.customer_id,sku_id:req.body.sku_id,promotor_id: proids[j]},
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
            ]    ,  
            attributes:['id',[fn('sum', col('total_sales_qty')), "unit_sales"]]
        });  
        alldata.push(filteredData)
    }
    // })           
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: alldata,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getPromotorCompareWithoutCust=async(req,res,next)=>{
    try {
        const proids=req.body.promotor_id;
        const alldata=[]
        console.log(req.body.promotor_id)
        // proids.map(async(item)=>{  
        for(var j= 0;j< proids.length ; j++){
            console.log("Promotor isd is",proids[j])
        var filteredData = await Warehouse.findAll({                                  
            where:{sku_id:req.body.sku_id,promotor_id: proids[j]},
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
            ]    ,  
            attributes:['id',[fn('sum', col('total_sales_qty')), "unit_sales"]]
        });  
        alldata.push(filteredData)
    }
    // })           
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: alldata,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getStoreCompare=async(req,res,next)=>{
    try {
        const proids=req.body.store_id;
        const alldata=[]
        console.log(req.body.store_id)
        // proids.map(async(item)=>{  
        for(var j= 0;j< proids.length ; j++){
            console.log("Promotor isd is",proids[j])
        var filteredData = await Warehouse.findAll({                                  
            where:{customer_id:req.body.customer_id,sku_id:req.body.sku_id,store_id: proids[j]},
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Store,
                attributes: ['id','store_name'],
                },
            ]    ,  
            attributes:['id',[fn('sum', col('total_sales_qty')), "unit_sales"]]
        });  
        alldata.push(filteredData)
    }
    // })           
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: alldata,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getStoreCompareWithoutCustomer=async(req,res,next)=>{
    try {
        const proids=req.body.store_id;
        const alldata=[]
        console.log(req.body.store_id)
        // proids.map(async(item)=>{  
        for(var j= 0;j< proids.length ; j++){
            console.log("Promotor isd is",proids[j])
        var filteredData = await Warehouse.findAll({                                  
            where:{sku_id:req.body.sku_id,store_id: proids[j]},
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Store,
                attributes: ['id','store_name'],
                },
            ]    ,  
            attributes:['id',[fn('sum', col('total_sales_qty')), "unit_sales"]]
        });  
        alldata.push(filteredData)
    }
    // })           
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: alldata,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getPromotorWeekly=async(req,res,next)=>{
    try {
        const proids=req.body.promotor_id;
        const alldata=[]
        console.log(req.body.promotor_id)
        // proids.map(async(item)=>{  
         var filteredData = await Warehouse.findAll({                                  
            where:{customer_id:req.body.customer_id,sku_id:req.body.sku_id,promotor_id: req.body.promotor_id},
            include:[
                {
                model:SKU,
                attributes: ['id','sku_desc'],
                },
                {
                model:Promotor,
                attributes: ['id','first_name','last_name'],
                },
            ]    ,  
            attributes:['id','total_sales_qty','created_on']
        });  
       
    // })           
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: alldata,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getAllPromotor=async(req,res,next)=>{
    try {
          var filteredData = await Promotor.findAll({                                  
            where:{is_deleted: '0'},  
            attributes:['id','first_name','last_name']
        });  
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
exports.getAllStore=async(req,res,next)=>{
    try {
          var filteredData = await Store.findAll({                                  
            where:{is_deleted: '0'},  
            attributes:['id','store_name'],
            group: ['store_name']
        });  
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: filteredData,
        })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
function getFilterConditions(req) {
    var whereStatement = {};
    // whereStatement.customer_id=req.body.customer_id
    if(req.body.store_id)
        whereStatement.store_id = req.body.store_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.sku_id)
        whereStatement.sku_id = req.body.sku_id;
    if(req.body.merchand_id)
        whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.category)
        whereStatement.category = req.body.category;
    if(req.body.product_name)
        whereStatement.product_name = req.body.product_name;

    return whereStatement;
  }
