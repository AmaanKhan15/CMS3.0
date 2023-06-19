const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Blacklist=sequelize.define('blacklist_token',{
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    }
},{
    freezeTableName:true
});


module.exports=Blacklist;


