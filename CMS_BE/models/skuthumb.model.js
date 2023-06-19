const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerdetail.model');
const SKUThumb = sequelize.define('sku_thumb', {
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
    skuthumb_details: {
        type: Sequelize.JSON,
        allowNull: true,
        // references: {
        //     model: Customer, 
        //     key: 'id',
        //  }
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

module.exports = SKUThumb;


