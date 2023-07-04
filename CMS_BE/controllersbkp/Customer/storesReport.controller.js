const Customer = require('../../models/customerdetail.model');
const helper = require('../../config/helpers')
var moment = require("moment");
const Warhouse = require('../../models/warehouse.model');
const Store = require('../../models/store.model');
const SKU = require('../../models/sku.model');
const { Op,fn,col } = require('sequelize');
const Warehouse = require('../../models/warehouse.model');

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
exports.getNearExpirayData = async (req, res, next) => {
    var startdate = new Date();
    const enddate = addDays(startdate, 15);
    var wareHouse = await Warhouse.findAll({
        where: {
            move_in_product_exp_date: {
                [Op.between]: [startdate, enddate]
            },
            customer_id: req.body.customer_id
        },
        attributes: ['id'],
        include: [
            {
                model: SKU,
                attributes: ['id', 'sku', 'sku_desc', 'category', 'product_name'],
            },
            {
                model: Store,
                attributes: ['store_name']

            }
        ],

    })
    return res.json({
        status: 200,
        message: "success",
        data: wareHouse
    });
}
exports.getRegionReport = async (req, res, next) => {
    try{
        var storesarr=[],storeid=[],totalSlaes=[];
        var StoreArea= await Store.findAll({
        where: {customer_id:req.body.customer_id,  is_deleted: '0' },
        attributes: ['area'],group: ['area']
        })
        for(var i=0;i<StoreArea.length;i++){
            var StoreDetails= await Store.findAll({
                where: {  area: StoreArea[i].area ,customer_id:req.body.customer_id},
                attributes:['id','area','store_name']
                })
                storesarr.push({ StoreDetails })
        }
        storesarr.map((store)=>{
         var subdata=  store.StoreDetails;
         subdata.map((store1)=>{
            storeid.push({id:store1.id,area:store1.area})
         })
        })        
        for(var j= 0;j< storeid.length ; j++){
                var Total= await Warehouse.findAll({
                where: {store_id:storeid[j].id },
                attributes:[[fn('sum', col('total_sales_qty')), "unit_sales"]]
            })
            totalSlaes.push({slaes:Total,region:storeid[j].area})
        }
        if (!StoreArea) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        return res.json({
            status: 200,
            message: "success",
            Total_Sales: totalSlaes
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
exports.getStoreComapre = async (req, res, next) => {
    try{
        var allstores=[];
    var StoreArea= await Store.findAll({
        where: {  is_deleted: '0' },
        attributes:['id']
        })
        for(var i=0;i<StoreArea.length;i++){
            var storecount= await Warehouse.findAll({
                where: {  is_deleted: '0' ,store_id:StoreArea[i].id},
                include: [
                    {
                        model: Store,
                        attributes: ['id', 'store_name'],
                    }],
                attributes:['total_sales_qty']
            })
            allstores.push({storecount})
        }
        if (!StoreArea) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        return res.json({
            status: 200,
            message: "success",
            All_Store_Compare: allstores
        });
    }catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }

}
exports.getLibraryOfCollectedData = async (req, res, next) => {
    try{
        var warehousedata=await Warehouse.findAll({
            where:{is_deleted:'0'},
            include: [
                {
                    model: SKU,
                    attributes: ['sku', 'sku_desc', 'category', 'product_name'],
                },
                {
                    model:Store,
                    attributes:['store_name']
                }
            ],
            attributes:['image1','image2','total_sales_qty']
        })
        if (!warehousedata) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        return res.json({
            status: 200,
            message: "success",
            Submitted_Data: warehousedata
        });

    }catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }

}
exports.getUnavailableSKU = async (req, res, next) => {
    var skuDetail = await Warehouse.findAll({
        where: {
            qty_warehouse: {
                [Op.lte]: 15,   
            },
            customer_id:req.body.customer_id,
        },
        limit: 5,
        attributes:['qty_warehouse','damage_qty'],
        include: [
            {
                model: SKU,
                attributes: ['id', 'sku', 'sku_desc', 'category', 'product_name'],
            },
            {
                model: Store,
                attributes: ['id','store_name']
            }]
    })    
    return res.json({
        status: 200,
        message: "success",
        data: skuDetail
    });
}
