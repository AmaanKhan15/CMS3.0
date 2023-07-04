const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const SKU=require("../models/sku.model")
const Shelfproduct = sequelize.define('shelf_product', {
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
     store_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    shelf_qty: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    no_of_shelf: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    damage_qty: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    shelf_space: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    floor_type: {
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

module.exports = Shelfproduct;


