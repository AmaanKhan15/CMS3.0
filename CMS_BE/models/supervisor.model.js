const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerdetail.model');
const Merchand = require('./merchandiser.model')
const Promotor = require('./promotor.model')
const Supervisor = sequelize.define('supervisor_detail', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    middle_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_proof: {
        type: Sequelize.STRING,
        allowNull: false
    },
    proof_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marchand_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: Merchand,
            key: 'id',
        }
    },
    customer_id: {
        type: Sequelize.STRING,
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

    username: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Supervisor;


