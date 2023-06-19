const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerdetail.model');
const Promotor = require('./promotor.model');
const AssignedTargetPromotor = sequelize.define('assigned_target_promotors', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Customer, 
        //     key: 'id',
        //  }
    },
    promotor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Promotor, 
        //     key: 'id',
        //  }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Promotor, 
        //     key: 'id',
        //  }
    },
    target_assigned: {
        type: Sequelize.STRING,
        allowNull: true,
    },
   
    target_achieved: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    sku_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
         // references: {
        //     model: SKU, 
        //     key: 'id',
        //  }
    },
    sku_name:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    target_desc:{
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

module.exports = AssignedTargetPromotor;


