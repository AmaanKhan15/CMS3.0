const merchandController=require('../../controllers/Customer/merchandReport.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
//   router.post('/customermodule/Merchand',MerchandController.postMerchandRecords);
  router.get('/customermodule/allCity',merchandController.getAllCity);
  router.post('/customermodule/allmerchand',merchandController.getAllMerchandiser);
  router.post('/customermodule/allStoreGroup',merchandController.getAllStoreGroup);
  router.post('/customermodule/allStore',merchandController.getAllStore);
  router.post('/customermodule/allCategory',merchandController.getAllCategory);
  router.post('/customermodule/allSKU',merchandController.getAllSKU);

  //Daily Report Api
  router.post('/customermodule/dailyReport',merchandController.getDailyMerchandRepo);
  router.post('/customermodule/dailyReportSku',merchandController.getDailyMerchandRepoWithSKU);

  //Unavialble Stock
  router.get('/customermodule/unavialableStock',merchandController.getUnavialableStock);
  router.post('/customermodule/unavialableStockStore',merchandController.getUnavialableStockWithStore);
  router.post('/customermodule/damageStock',merchandController.getDamageStock);
  router.post('/customermodule/nearExpiray',merchandController.getNearExpiray);

 }
