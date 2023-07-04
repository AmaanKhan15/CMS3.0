const SKU = require('../../models/sku.model');
const Merchand = require('../../models/merchandiser.model');
const StoreGroup = require('../../models/storegroup.model');
const Store = require('../../models/store.model');
const Warhouse = require('../../models/warehouse.model');
const sequelize = require('../../config/database');
const { Op,fn,col } = require('sequelize');
const shelfProduct = require("../../models/shelfproduct.model")
const floorProduct = require("../../models/floorproduct.model")
const refregProduct = require("../../models/refProduct.model")
const helper = require('../../config/helpers')


var moment = require("moment");
const City = require('../../models/city.model');


exports.getAllCity = async (req, res, next) => {
    try {
        const filteredData = await City.findAll({                                           
            // where:getFilterConditions(req),            
            attributes: ['id','city_name'],            
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
exports.getAllStoreId = async (req, res, next) => {
    try {                
        var filteredData = await StoreGroup.findAll({                                           
            where:{is_deleted: '0',id:req.body.store_group_id},            
            attributes: ['id','store_details'],                                
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
        if(req.body.store_group_id){
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
}else{
    var storesarr=[];
    var filteredData = await Store.findAll({                                           
        where:{is_deleted: '0'},            
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
            where:getCategoryFilter(req),
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
 async function FloorData(req,skuId,filteredData,callback){
    let allData=[];
    for(let i=0;i<skuId.length;i++){
       const  FloorData = await floorProduct.findAll({
           where:getFilterConditionsForMerchandiser(req,skuId[i]), 
       })
       const  ShelfData = await shelfProduct.findAll({
           where:getFilterConditionsForMerchandiser(req,skuId[i]), 
       })
    
       allData.push({"floorData":FloorData,"warehouse":filteredData[i],"ShelfData":ShelfData});
   }
   callback({
    status: 200,
    Floordata: allData,
});
}
exports.getMerchandSalesReport=async(req,res,next)=>{
    try {       
        const filteredData = await Warhouse.findAll({
            where:getSalesReportFilter(req),                                   
            attributes:['move_out_qty','move_in_qty']            
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
    try {       
        const filteredData = await Warhouse.findAll({
            where:getFilterConditions(req), 
                       
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
        let skuId=[];
        filteredData.map((item,key)=>{
            skuId.push(item.sku_id);
        })
            FloorData( req,skuId, filteredData,function (result2) {
                return res.status(200).send({
                    message: "Result Fetched",
                
                    data:result2
                })
            });
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        // res.status(200).json({
        //     message: "Result Fetched",
        //     data: filteredData,
        // })

    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    } 
}
 async function FloorDataVisiblity(req,skuId,filteredData,callback){
    let allData=[],allBar=[];
    var floorTotal=0,shelfTotal=0;
    for(let i=0;i<skuId.length;i++){
       const  FloorData = await floorProduct.findAll({
           where:getFilterConditionsForMerchandiser(req,skuId[i]), 
       })
       const  ShelfData = await shelfProduct.findAll({
           where:getFilterConditionsForMerchandiser(req,skuId[i]), 
       })
       
       if(FloorData.length>0){
        FloorData.map((item)=>{
            floorTotal= parseInt(floorTotal)+parseInt(item.floor_qty)
       })

    }
      if(ShelfData.length>0){
        ShelfData.map((item)=>{
            shelfTotal=parseInt(shelfTotal)+parseInt(item.shelf_qty)
           })
      } 
      allData.push({"floorData":FloorData,"warehouse":filteredData[i],"ShelfData":ShelfData});
   }
   allBar.push(floorTotal,shelfTotal);

   callback({
    status: 200,
    Floordata: allData,
    bardata:allBar
});
}
exports.getVisiblityMerchandRepoWithSKU=async(req,res,next)=>{
    try {       
        const filteredData = await Warhouse.findAll({
            where:getVisiblityFilterConditions(req),                        
            include:[
                {
                model:Store,
                 where: getStoreFilter(req),
                attributes: ['id','store_name','city'],
                },                
                {
                model:SKU,
                where: getCategoryFilter(req),
                required: true,
                },                
                {
                model:Merchand,
                attributes: ['id',[fn('concat', col('first_name'), ' ', col('last_name')), "FullName"]],
                },                
            ] ,
            
        })  
        let skuId=[];
        filteredData.map((item,key)=>{
            skuId.push(item.sku_id);
        })
        FloorDataVisiblity( req,skuId, filteredData,function (result2) {
                return res.status(200).send({
                    message: "Result Fetched",
                    data:result2
                })
            });
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
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
    try {       
        const filteredData = await Warhouse.findAll({
            where:getFilterConditions(req), 
                       
            include:[
                {
                model:Store,
                 where: getStoreFilter(req),
                attributes: ['id','store_name','city'],
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
        let skuId=[];
        filteredData.map((item,key)=>{
            skuId.push(item.sku_id);
        })
            FloorData( req,skuId, filteredData,function (result2) {
                return res.status(200).send({
                    message: "Result Fetched",
                
                    data:result2
                })
            });
        
        if (!filteredData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
//  res.status(200).json({
//             message: "Result Fetched",
//             data: filteredData,
//             sku:skuId
//         })
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
            // where:{store_id: req.body.store_id,qty_warehouse:'0'}, 
            where:getUnavialableStoreFilter(req),
            include:[
                {
                model:Store,
                  where: getStoreFilter(req),
                attributes: ['id','store_name','city'],
                },                
                {
                model:SKU,
                where:getUnavialSKUFilter(req)  
                }
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
            // where:{qty_warehouse:'0'},
            where:getUnavialableStoreFilter(req),

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
            // where: {
            //     [Op.and]: [
            //         {qty_warehouse: {[Op.gte]: 1},store_id:req.body.store_id}
            //     ]
            //   },
             where: getDamageStockcondition(req),
            include:[
                {
                model:Store,
                where: getStoreFilter(req),
                attributes: ['id','store_name','city'],
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
   
    try {
        var wareHouse = await Warhouse.findAll({
            where:getExpirayFilters(req),
            include: [
                {
                    model: SKU,
                    // attributes: ['id', 'sku', 'sku_desc', 'category', 'product_name'],
                },
                {
                    model: Store,
                    where: getStoreFilter(req),
                    attributes: ['store_name','city']
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
function getUnavialableStoreFilter(req){
   var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
     whereStatement.merchand_id = {
        [Op.like]: '%' + req.body.merchand_id + '%'
      }
        //whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    // if(req.body.city)
    //     whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';
    if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }
    whereStatement.qty_warehouse = '0';

return whereStatement;

}
function getVisiblityFilterConditions(req) {
    var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
     whereStatement.merchand_id = {
        [Op.like]: '%' + req.body.merchand_id + '%'
      }
        //whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    // if(req.body.city)
    //     whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';
        if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }

    return whereStatement;
}
function getExpirayFilters(req){
    var whereStatement = {};
    var startdate = new Date();
    const enddate = addDays(startdate, req.body.days);
    whereStatement.move_in_product_exp_date ={
                [Op.between]: [startdate, enddate]
            }  
    if(req.body.store_id)
    whereStatement.store_id =req.body.store_id;               
return whereStatement;
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
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
     whereStatement.merchand_id = {
        [Op.like]: '%' + req.body.merchand_id + '%'
      }
        //whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    // if(req.body.city)
    //     whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';
        if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }

    return whereStatement;
}
function getStoreFilter(req){
    var whereStatement = {};
    if(req.body.city)
    whereStatement.city =req.body.city;
    whereStatement.is_deleted = '0';

return whereStatement;

}
function getUnavialSKUFilter(req){
    var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }      
    whereStatement.shelf_qty = '0';
    whereStatement.floor_qty = '0';
    whereStatement.ref_qty = '0';
    return whereStatement;
}
function getSalesReportFilter(req) {
    var whereStatement = {};
    if(req.body.store_id)
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }    
    if(req.body.promotor_id)
        whereStatement.promotor_id = req.body.promotor_id;
    if(req.body.merchand_id)
     whereStatement.merchand_id = {
        [Op.like]: '%' + req.body.merchand_id + '%'
      }
        //whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    // if(req.body.city)
    //     whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';
        if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }

    return whereStatement;
}
function getDamageStockcondition(req){
    var whereStatement = {};
    if(req.body.store_id)
    whereStatement.store_id =req.body.store_id;   
    if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }
    whereStatement.qty_warehouse ={[Op.gte]: 1}
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
function getFilterConditionsForMerchandiser(req,skuId) {
    var whereStatement = {};
    whereStatement.sku_id = skuId;
    if(req.body.store_id)
        whereStatement.store_id = {
        [Op.like]: '%' + req.body.store_id + '%'
      }    
    if(req.body.merchand_id)
     whereStatement.merchand_id = {
        [Op.like]: '%' + req.body.merchand_id + '%'
      }
        //whereStatement.merchand_id = req.body.merchand_id;
    if(req.body.customer_id)
        whereStatement.customer_id = req.body.customer_id;
    if(req.body.store_group_id)
        whereStatement.store_group_id = req.body.store_group_id;
    // if(req.body.city)
    //     whereStatement.city = req.body.city;
        whereStatement.is_deleted = '0';
        if (req.body.startdate) 
        whereStatement.createdAt = {
              [Op.gt]: moment(req.body.startdate).format('YYYY-MM-DD 00:00'),
              [Op.lte]: moment(req.body.enddate).format('YYYY-MM-DD 23:59')
            }
console.log("merchnad report s",whereStatement)
    return whereStatement;
}
