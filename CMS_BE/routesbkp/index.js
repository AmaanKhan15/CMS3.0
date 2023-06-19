
const Customer =require('./customerdetail.route')
const SKU=require("./sku.route")
const Store=require("./store.route");
const Merchand=require("./merchand.route");
const Promotor=require("./promotor.route");
const Supervisor=require("./supervisor.route");
const StoreGroup=require("./storegroup.route");
const Users=require("./users.route");
const Skuthumb=require("./skuthumb.route");
const Loginrecord=require("./loginrecords.route");
const Assignedpromotor=require("./assignedpromotor.route");
const Assignedmerchand=require("./assignedmerchand.route");
const PromotorStore=require("./promotorstores.route");
const MerchnadStore=require("./merchandiserstores.route");
const Country=require("./country.route");
const City=require("./city.route");
const Regions=require("./regions.route");
const Shelfproduct=require("./shelfproduct.route");
const Refregproduct=require("./refregproduct.route");
const Floorproduct=require("./floorproduct.route");
const WareHouse=require("./warehouse.route");
const PromotorLogin=require("./PromotorApp/login.route");
const MerchandLogin=require("./MerchandApp/login.route");
const Assignedpromotorstore=require("./PromotorApp/assignedstore.route");
const Assignedmerchandstore=require("./MerchandApp/assignedstore.route");
const Skuentry=require("./PromotorApp/skuentry.route");
const SkuMerchandentry=require("./MerchandApp/skuentry.route");
const Dashboard=require("./dashboard.route")
const Targettopromotor=require("./targetassignedpromo.route")
const FilteredData=require("./filter.route")
const CustomerDashboard=require('./Customer/dashboard.route')
const PromotorReport=require('./Customer/promotorReport.route')
const LoginActivity=require('./LoginActivity/loginactive.route')
const StoreComapre=require('./Customer/storeReport.route')
const MerchandReports=require('./Customer/mechandReport.route')
module.exports =(router) =>{        
    Customer(router);
    SKU(router);
    Store(router);
    Merchand(router);
    Promotor(router);
    Supervisor(router);
    StoreGroup(router);
    Users(router);
    Skuthumb(router);
    Loginrecord(router);
    Assignedpromotor(router);
    Assignedmerchand(router);
    PromotorStore(router);
    MerchnadStore(router);
    Country(router);
    City(router);
    Regions(router);
    Shelfproduct(router);
    Refregproduct(router);
    Floorproduct(router);
    WareHouse(router);
    PromotorLogin(router);
    Assignedpromotorstore(router);
    Assignedmerchandstore(router);
    Skuentry(router);
    SkuMerchandentry(router);
    MerchandLogin(router);
    Targettopromotor(router);
    Dashboard(router);
    FilteredData(router);
    CustomerDashboard(router);
    PromotorReport(router);
    LoginActivity(router);
    StoreComapre(router);
    MerchandReports(router);
    return router;
};
