const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const SKU=require("../models/sku.model")
const Store=require("../models/store.model")
const Promotor=require("../models/promotor.model");
const Merchand=require("../models/merchandiser.model");
const Customer = require('./customerdetail.model');
const Warehouse = sequelize.define('ware_house', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    sku_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: SKU, 
            key: 'id',
        }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Store, 
            key: 'id',
        }
    },
    promotor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Promotor, 
            key: 'id',
        }
    },
    merchand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Merchand, 
            key: 'id',
        }
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Customer, 
            key: 'id',
        }
    },
    damage_qty: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    total_sales_qty: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    total_amt: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    qty_warehouse: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    move_in_qty: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    move_out_qty: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    move_in_product_exp_date: {
        type: Sequelize.DATE,
        allowNull: true,
        
    },
    image1: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    image2: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
   
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    updated_on: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    is_deleted: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        allowNull: false
    },

}, {
    freezeTableName: true
});

module.exports = Warehouse;


