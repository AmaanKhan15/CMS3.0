const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Store=require("./store.model")
const Promotor=require("./promotor.model");
const Customer = require('./customerdetail.model');
const Feedback = sequelize.define('feedback', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
   
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Customer, 
            key: 'id',
        }
    },
   
    footfall: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    footfall_change: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },   
    invoices: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    conversion_rate: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_apple: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_samsung: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_huawei: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_xiaomi: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_oppo: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_other: {
        type: Sequelize.INTEGER,
        allowNull: true,       
    },
    sob_total: {
        type: Sequelize.INTEGER,
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

module.exports = Feedback;


