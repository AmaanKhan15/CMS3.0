const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const User_login=sequelize.define('users_login',{
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    logged_out: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    logged_in_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    logged_out_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    ip_address: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    token_id: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    token_secret: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    token_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    device: {
        type: Sequelize.TEXT,
        allowNull: true
    }
},{
    freezeTableName:true
});


module.exports=User_login;
