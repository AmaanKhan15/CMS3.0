const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./country.model');
const City = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    country_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
          references: {
            model: Country, 
            key: 'id',
         }
        
    },
    city_name: {
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

module.exports = City;


