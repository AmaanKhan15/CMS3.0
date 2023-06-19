const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerdetail.model');
const Promotor = require('./promotor.model');
const Store = require('./store.model');
const SKU = require('./sku.model');
const AssignedPromotorSku = sequelize.define('assigned_promotors_sku', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Customer, 
            key: 'id',
         }
    },
    sku_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: SKU, 
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
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Store, 
            key: 'id',
         }
    },
    category_id:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    sub_category_id:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    shelf_qty:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    total_sales_qty:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    total_amount:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    damaged_item_qty:{
        type: Sequelize.STRING,
        allowNull: false,
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

module.exports = AssignedPromotorSku;


