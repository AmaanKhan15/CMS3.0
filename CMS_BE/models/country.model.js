const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    country_name: {
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

module.exports = Country;


