const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Customer=require('./customerdetail.model');
const Merchand=require('./merchandiser.model')
const Store=require('./store.model')
const Storegroup=sequelize.define('storegroup_detail',{
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },       
    store_details:{
        type:Sequelize.STRING,
        allowNull:false,
    },   
    store_group_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },          
    customer_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: Customer, 
            key: 'id',
         }
        
    },         
    merchand_id:{
        type:Sequelize.STRING,
        allowNull:true,
        references: {
            model: Merchand, 
            key: 'id',
         }
        
    },                               
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,       
    },
    created_on:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    updated_by:{
        type:Sequelize.INTEGER,
        allowNull:true,       
    },
    updated_on:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    is_deleted:{
        type:Sequelize.ENUM('0', '1'),
        defaultValue:'0',
        allowNull:false
    },
   
},{
    freezeTableName:true
});


module.exports=Storegroup;


