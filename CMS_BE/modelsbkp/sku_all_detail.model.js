const Sequelize=require('sequelize');
const Customer=require('./customerdetail.model')
const Store=require('./store.model')
const sequelize=require('../config/database');
const SKU=sequelize.define('sku_all_detail',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
       
    sku:{
        type:Sequelize.STRING,
        allowNull:false,
    },
        
    sku_qty:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
    ref_no:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
    sku_desc:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },  
    product_name:{
        type:Sequelize.STRING,
        allowNull:false
    },         
    product_desc:{
        type:Sequelize.STRING,
        allowNull:false
    },         
    product_price:{
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
    store_id:{
        type:Sequelize.JSON,
        allowNull:true,
        references: {
            model: Store, 
            key: 'id',
         }
    },         
            
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:true,       
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



module.exports=SKU;


