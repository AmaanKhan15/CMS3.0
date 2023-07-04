const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerdetail.model');
const Merchand = require('./merchandiser.model');
const AssignedMerchand = sequelize.define('assigned_merchands', {
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
    merchand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Merchand, 
        //     key: 'id',
        //  }
    },
    store_group_id:{
        type:Sequelize.STRING,
        allowNull:true
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

module.exports = AssignedMerchand;


