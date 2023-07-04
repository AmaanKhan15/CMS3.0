const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const SKU = require('./sku.model');
const SKUThumb = require('./skuthumb.model');
const Store = require('./store.model');
const Merchand=require('./merchandiser.model');
const Promotor = require('./promotor.model');
const Supervisor = require('./supervisor.model');
const User = require('./users.model');
const Merchandiser = require('./merchandiser.model');
const StoreGroup = require('./storegroup.model');
const Loginrecords = require('./loginrecord.model');
const AssignedPromotor = require('./assignedpromotor.model');
const AssignedMerchand = require('./assignedmerchand.model');
const PromotorStores = require('./promotorstores.model');
const Refregproduct = require('./refregproduct.model');
const Shelfproduct = require('./shelfproduct.model');
const Floorproduct = require('./floorproduct.model');
const Warehouse = require('./warehouse.model');
const AssignedPromotorSku =require("./promotorskuentry.model");
const Salesman=require('./salesman.model');

const Customer=sequelize.define('customer_detail',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },       
    company_name:{
        type:Sequelize.STRING,
        allowNull:true,
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
    email:{
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
    assigned_supervisor:{
        type:Sequelize.INTEGER,
        allowNull:true,
          references: {
            model: Supervisor, 
            key: 'id',
         }
    },         
    id_proof:{
        type:Sequelize.STRING,
        allowNull:true
    },         
    is_shelf:{
        type:Sequelize.STRING,
        allowNull:true
    },         
    is_floor:{
        type:Sequelize.STRING,
        allowNull:true

    },         
    is_refreg:{
        type:Sequelize.STRING,
        allowNull:true
    }, 
    is_summary:{
        type:Sequelize.ENUM('0', '1'),
        defaultValue:'0',
        allowNull:false
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

SKU.belongsTo(Customer,{foreignKey: 'customer_id',constraints: false});
SKU.belongsTo(Store,{foreignKey:'store_id',constraints: false})

AssignedPromotorSku.belongsTo(Customer,{foreignKey: 'customer_id',constraints: false})
AssignedPromotorSku.belongsTo(Store,{foreignKey:'store_id',constraints: false})
AssignedPromotorSku.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
AssignedPromotorSku.belongsTo(SKU,{foreignKey:'sku_id',constraints:false})

SKUThumb.belongsTo(Customer,{foreignKey: 'customer_id',constraints: false});
Store.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
User.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
AssignedPromotor.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
AssignedPromotor.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
AssignedMerchand.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
AssignedMerchand.belongsTo(Merchand,{foreignKey:'merchand_id',constraints:false})
Loginrecords.belongsTo(User,{foreignKey:'user_id',constraints:false})
User.belongsTo(Merchandiser,{foreignKey:'merchand_id',constraints:false})
User.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
User.belongsTo(Store,{foreignKey:'store_id',constraints:false})
User.belongsTo(StoreGroup,{foreignKey:'storegroup_id',constraints:false})
User.belongsTo(Supervisor,{foreignKey:'supervisor_id',constraints:false})
Merchand.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
Merchand.belongsTo(StoreGroup,{foreignKey:'store_group_id',constraints:false})
Merchand.belongsTo(Supervisor,{foreignKey:'supervisor_id',constraints:false})

Promotor.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
Promotor.belongsTo(Store,{foreignKey:'store_id',constraints:false})
Promotor.belongsTo(Supervisor,{foreignKey:'supervisor_id',constraints:false})

Supervisor.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
Supervisor.belongsTo(Merchand,{foreignKey:'marchand_id',constraints:false})
Supervisor.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
Customer.belongsTo(Supervisor,{foreignKey:'assigned_supervisor',constraints:false})
PromotorStores.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
PromotorStores.belongsTo(Store,{foreignKey:'store_id',constraints:false})

StoreGroup.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
StoreGroup.belongsTo(Merchand,{foreignKey:'marchand_id',constraints:false})
// StoreGroup.belongsTo(Store,{foreignKey:'store_details',constraints:false})

Refregproduct.belongsTo(SKU,{foreignKey:'sku_id',constraints:false})
Shelfproduct.belongsTo(SKU,{foreignKey:'sku_id',constraints:false})
Floorproduct.belongsTo(SKU,{foreignKey:'sku_id',constraints:false})

Warehouse.belongsTo(SKU,{foreignKey:'sku_id',constraints:false})
Warehouse.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
Warehouse.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
Warehouse.belongsTo(Store,{foreignKey:'store_id',constraints:false})
Warehouse.belongsTo(Merchand,{foreignKey:'merchand_id',constraints:false})


Loginrecords.belongsTo(Store,{foreignKey:'store_id',constraints:false})
Loginrecords.belongsTo(Merchand,{foreignKey:'merchand_id',constraints:false})
Loginrecords.belongsTo(Promotor,{foreignKey:'promotor_id',constraints:false})
Loginrecords.belongsTo(User,{foreignKey:'user_id',constraints:false})
Loginrecords.belongsTo(StoreGroup,{foreignKey:'store_group_id',constraints:false})

Salesman.belongsTo(Customer,{foreignKey:'customer_id',constraints:false})
Salesman.belongsTo(StoreGroup,{foreignKey:'store_group_id',constraints:false})
Salesman.belongsTo(Supervisor,{foreignKey:'supervisor_id',constraints:false})

module.exports=Customer;



