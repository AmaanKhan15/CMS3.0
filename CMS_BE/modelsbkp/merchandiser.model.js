const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Customer = require('./customerdetail.model');
const StoreGroup=require('./storegroup.model')
const Supervisor=require('./supervisor.model')
const Merchandiser=sequelize.define('merchand_detail',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        
    first_name:{
        type:Sequelize.STRING,
        allowNull:true,
    },    
    middle_name:{
        type:Sequelize.STRING,
        allowNull:true,
    },    
    last_name:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    gender:{
        type:Sequelize.STRING,
        allowNull:true
    },  
    phone_no:{
        type:Sequelize.STRING,
        allowNull:true
    },         
    city:{
        type:Sequelize.STRING,
        allowNull:true
    },         
    address:{
        type:Sequelize.STRING,
        allowNull:true
    },         
    area:{
        type:Sequelize.STRING,
        allowNull:true
    },         
   email:{
    type:Sequelize.STRING,
    allowNull:true
   },
   id_proof:{
    type:Sequelize.STRING,
    allowNull:true
   },
   proof_no:{
    type:Sequelize.STRING,
    allowNull:true
   },
   store_group_id:{
    type:Sequelize.INTEGER,
    allowNull:true, 
    references: {
        model: StoreGroup, 
        key: 'id',
     }
   },
   customer_id:{
    type:Sequelize.INTEGER,
    allowNull:true,
    references: {
        model: Customer, 
        key: 'id',
     }
},         
   supervisor_id:{
    type:Sequelize.INTEGER,
    allowNull:true,
    references: {
        model: Supervisor, 
        key: 'id',
     }
},         
  
    username:{
        type:Sequelize.CHAR,
        allowNull:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:true
    },        
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:true,       
    },
    created_on:{
        type:Sequelize.DATE,
        allowNull:true,
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
        allowNull:true
    },
   
},{
    freezeTableName:true
});

module.exports=Merchandiser;


