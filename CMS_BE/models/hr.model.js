const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const HRdetails = sequelize.define('hr_details', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: true,        
    },   
    mobile_no: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: true,        
    },
    address:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    profile_tag:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    resume:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    resume_head:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    profile_summary:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    role:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    qualification:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    college:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    key_skill:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    experience:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    company_name:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    summary:{
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
    short_list: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        allowNull: false
    },

}, {
    freezeTableName: true
});

module.exports = HRdetails;



