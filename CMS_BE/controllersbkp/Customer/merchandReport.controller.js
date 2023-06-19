const SKU = require('../../models/sku.model');
const Merchand = require('../../models/merchandiser.model');
const StoreGroup = require('../../models/storegroup.model');
const Store = require('../../models/store.model');
const Warhouse = require('../../models/warehouse.model');
const sequelize = require('../../config/database');
const { Op,fn,col } = require('sequelize');


exports.getAllCity = async (req, res, next) => {
    try {
        const filteredData = await Merchand.findAll({                                           
            where:getFilterConditions(req),            
            attributes: ['id','city'],
            group: ['city']
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
exports.getAllMerchandiser = async (req, res, next) => {
    try {
        const filteredData = await Merchand.findAll({                                           
            where:getFilterConditions(req),            
            attributes: ['id',[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"],'store_group_id'],
            // group: ['first_name','last_name']          
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
exports.getAllStoreGroup = async (req, res, next) => {
    try {
        const filteredData = await StoreGroup.findAll({                                           
            where:getFilterConditions(req),            
            attributes: ['id', 'store_group_name','store_details'],         
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
exports.getAllStore = async (req, res, next) => {
    try {
        const ids=req.body.store_group_id;
        var storesarr=[];
        var nameArr = ids.split(',');
       for(var i=0;i<nameArr.length;i++){            
        var filteredData = await Store.findAll({                                           
            where:{is_deleted: '0',id:nameArr[i]},            
            attributes: ['id','store_name'],                                
        }); 
        storesarr.push({ filteredData })       
    }
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: storesarr,
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
exports.getAllCategory=async(req,res,next)=>{
    try {
        const filteredData = await SKU.findAll({
            where: {store_id: {
                [Op.like]: '%' + req.body.store_id + '%'
            }},
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
exports.getAllSKU=async(req,res,next)=>{
    try {
        const filteredData = await SKU.findAll({
            where:getFilterConditions(req),
            attributes:['sku_desc','id'],  
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
exports.getDailyMerchandRepo=async(req,res,next)=>{
    console.log("in daily report",req.body.merchand_id ,req.body.store_id )
    try {       
        const filteredData = await Warhouse.findAll({
            // where:getFilterConditions(req), 
                where: {
                    [Op.and]: [
                        { merchand_id:  req.body.merchand_id },
                        { store_id: req.body.store_id },
                    ]
                  } ,         
            include:[
                {
                model:Store,
                attributes: ['id','store_name'],
                },                
                {
                model:SKU,
                where: getCategoryFilter(req),
                // attributes: ['id','sku','sku_desc','product_name','product_qty','planogram','floor_type','shelf_space','damage_qty','no_of_shelf','shelf_qty','exp_date'],
                required: true,
                },                
                {
                model:Merchand,
                attributes: ['id',[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"]],
                },                
            ] ,
            // attributes:['id','damage_qty','total_sales_qty','total_amt','move_in_qty','move_out_qty','move_in_product_exp_date','created_on'],  
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
exports.getDailyMerchandRepoWithSKU=async(req,res,next)=>{
    console.log("in daily report",req.body.merchand_id ,req.body.store_id )
    try {       
        const filteredData = await Warhouse.findAll({
            // where:getFilterConditions(req), 
                where: {
                    [Op.and]: [
                        { merchand_id:  req.body.merchand_id },
                        { store_id: req.body.store_id },
                        { sku_id: req.body.sku_id },
                    ]
                  } ,         
            include:[
                {
                model:Store,
                attributes: ['id','store_name'],
                },                
                {
                model:SKU,
                where: getCategoryFilter(req),
                // attributes: ['id','sku','sku_desc','product_name','product_qty','planogram','floor_type','shelf_space','damage_qty','no_of_shelf','shelf_qty','exp_date'],
                required: true,
                },                
                {
                model:Merchand,
                attributes: ['id',[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"]],
                },                
            ] ,
            // attributes:['id','damage_qty','total_sales_qty','total_amt','move_in_qty','move_out_qty','move_in_product_exp_date','created_on'],  
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
exports.getUnavialableStockWithStore=async(req,res,next)=>{
    try {
        const filteredData = await Warhouse.findAll({
            where:{store_id: req.body.store_id,qty_warehouse:'0'},
            include:[
                {
                model:Store,
                attributes: ['id','store_name'],
                },                
                {
                model:SKU,
                where:{store_id: {
                    [Op.like]: '%' + req.body.store_id + '%'
                },shelf_qty:'0',ref_qty:'0',floor_qty:'0'},
                required: true,
                },                                               
            ],
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
exports.getUnavialableStock=async(req,res,next)=>{
    try {
        const filteredData = await Warhouse.findAll({
            where:{qty_warehouse:'0'},
            include:[
                {
                model:Store,
                attributes: ['id','store_name'],
                },                
                {
                model:SKU,
                where: getFilterStockofSKUConditions(req),
                required: true,
                },                                               
            ],
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
exports.getDamageStock=async(req,res,next)=>{
    try {
        const filteredData = await Warhouse.findAll({
            // where:{qty_warehouse: {[Op.gte]: 1},store_id:req.body.store_id},
            where: {
                [Op.and]: [
                    {qty_warehouse: {[Op.gte]: 1},store_id:req.body.store_id}
                ]
              },
            include:[
                {
                model:Store,
                attributes: ['id','store_name'],
                },                
                {
                model:Merchand,
                attributes: ['id',[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"]],
                },  
                {
                    model:SKU,
                    attributes: ['id',[fn('concat', col('sku'), ' ', col('sku_desc')), "SkuName"]],
                },             
                                                              
            ],
            attributes:['damage_qty','id']

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
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
exports.getNearExpiray=async(req,res,next)=>{
    var startdate = new Date();
    const enddate = addDays(startdate, 15);
    try {
        var wareHouse = await Warhouse.findAll({
            where: {
                move_in_product_exp_date: {
                    [Op.between]: [startdate, enddate]
                },
                store_id: req.body.store_id
            },
            include: [
                {
                    model: SKU,
                    // attributes: ['id', 'sku', 'sku_desc', 'category', 'product_name'],
                },
                {
                    model: Store,
                    attributes: ['store_name']
                }
            ],
    
        })        
        if (!wareHouse) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: wareHouse,
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
function getCategoryFilter(req){
    var whereStatement = {};
    if(req.body.category)
        whereStatement.category = req.body.category;    
    return whereStatement;
}
function getFilterConditions(req) {
    var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = req.body.store_id;    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
        whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    if(req.body.city)
        whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';

    return whereStatement;
}
function getFilterStockofWarehouseConditions(req){
    var whereStatement = {};
    if(req.body.store_id)
    whereStatement.store_id =req.body.store_id;
    whereStatement.is_deleted = '0';

return whereStatement;

}
function getFilterStockofSKUConditions(req){
    var whereStatement = {}; 
    whereStatement.shelf_qty = '0';
    whereStatement.ref_qty = '0';
    whereStatement.floor_qty = '0';
    whereStatement.is_deleted = '0';
    // if(req.body.store_id)
    // whereStatement.store_id =req.body.store_id;
    whereStatement.is_deleted = '0';

return whereStatement;
}
