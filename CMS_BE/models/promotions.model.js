const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Store=require("../models/store.model")
const Promotor=require("../models/promotor.model");
const Customer = require('./customerdetail.model');
const Promotion = sequelize.define('promotions', {
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
    image1: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    image2: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
   
    image3: {
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

module.exports = Promotion;


