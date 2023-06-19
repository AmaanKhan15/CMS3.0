const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const SKU=require("../models/sku.model")
const Floorproduct = sequelize.define('floor_product', {
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
    floor_type: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    product_qty: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    floor_qty: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    planogram: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    merchand_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    promotor_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    customer_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    exp_date:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

module.exports = Floorproduct;



