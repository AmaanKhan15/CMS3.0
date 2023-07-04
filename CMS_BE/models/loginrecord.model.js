const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Merchandiser = require('./merchandiser.model');
const Customer = require('./customerdetail.model');
const Promotor = require('./promotor.model');
const Store = require('./store.model');
const StoreGroup = require('./storegroup.model');
const User = require('./users.model');
const Loginrecords = sequelize.define('login_records', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: User, 
            key: 'id',
         }
    },
    login_time: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    merchand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Merchandiser, 
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
    store_group_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: StoreGroup, 
            key: 'id',
         }
    },
    logout_time: {
        type: Sequelize.DATE,
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
        allowNull: false,
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

module.exports = Loginrecords;
