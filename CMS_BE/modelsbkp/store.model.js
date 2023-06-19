const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Customer=require('./customerdetail.model')
const Store=sequelize.define('store_detail',{
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
       
    store_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },   
    ref_no:{
        type:Sequelize.STRING,
        allowNull:false,
    },       
    contact_no:{
        type:Sequelize.STRING,
        allowNull:false
    },  
    city:{
        type:Sequelize.STRING,
        allowNull:false
    },  
    area:{
        type:Sequelize.STRING,
        allowNull:false
    },         
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    latitude:{
        type:Sequelize.STRING,
        allowNull:false
    },  
          
    longitude:{
        type:Sequelize.STRING,
        allowNull:false
    },
    customer_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
            model: Customer, 
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


module.exports=Store;


