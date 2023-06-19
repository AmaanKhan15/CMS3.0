const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./store.model');
const Promotor = require('./promotor.model');
const PromotorStores = sequelize.define('promotors_store', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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

module.exports = PromotorStores;


