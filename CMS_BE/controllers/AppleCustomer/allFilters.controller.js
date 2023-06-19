const SKU = require('../../models/sku.model');
const Store = require('../../models/store.model');
const sequelize = require('../../config/database');
const { Op,fn,col } = require('sequelize');

exports.getAllRegions = async (req, res, next) => {
    try {        
        const Regions = await Store.findAll({           
            attributes: ['area','id'], group: ['area']
        });
       if (!Regions ) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Regions
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductMac = async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Mac' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAccessories = async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Accessories' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAirPods= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'AirPods' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAppleTV= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Apple TV' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAppleWatch= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Apple Watch' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAppleWatchBands= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Apple Watch Bands' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductAppleCare= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'AppleCare+' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductBeats= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'Beats' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductiPod= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'iPod' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductiPhone= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'iPhone' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getAllProductipad= async (req, res, next) => {
    try {        
        const Product = await SKU.findAll({
            where: { category:'ipad' },
            attributes: ['product_name','id'], group: ['product_name']
        });
       if (!Product ) {
            return res.status(404).json({
                status: 404,  
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data:Product
           
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}


