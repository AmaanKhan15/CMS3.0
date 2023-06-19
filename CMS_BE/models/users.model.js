const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Customer=require('./customerdetail.model');
const Merchand=require('./merchandiser.model')
const Store=require('./store.model')
const StoreGroup=require('./storegroup.model')
const User=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },       
    username:{
        type:Sequelize.STRING,
        allowNull:false,
    },   
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },          
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },          
    user_type:{
        type:Sequelize.STRING,
        allowNull:false,
    },          
    password:{
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
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: Merchand, 
            key: 'id',
         }
        
    },         
    promotor_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: Merchand, 
            key: 'id',
         }
        
    },         
    store_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: Store, 
            key: 'id',
         }
        
    },         
    storegroup_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: StoreGroup, 
            key: 'id',
         }
        
    },         
    supervisor_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: StoreGroup, 
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
    is_active:{
        type:Sequelize.ENUM('0', '1'),
        defaultValue:'0',
        allowNull:false
    },
   
},{
    freezeTableName:true
});

module.exports=User;


