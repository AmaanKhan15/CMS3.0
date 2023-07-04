const promotorController=require('../../controllers/Customer/promotorReport.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
  router.post('/customermodule/promotorReport',promotorController.getFilteredData);
  router.post('/merchandmodule/merchandReportwithout',promotorController.getFilteredDataMerchandiser);
  router.post('/merchandmodule/singlemerchandReport',promotorController.getSingleMerchandiser);
  router.post('/customermodule/citysalescategory',promotorController.getCategoryCitySales);
  router.post('/customermodule/citysalesproduct',promotorController.getProductCitySales);
  router.post('/customermodule/citysalessku',promotorController.getSKUCitySales);
  router.post('/customermodule/salesUnit',promotorController.getSalesUnit);
  router.post('/customermodule/citysalesUnit',promotorController.getCitySalesUnit);
  router.get('/customermodule/storeByCustomer/:custId',promotorController.getStoreByCustomer);
  router.post('/customermodule/promoComapare',promotorController.getPromotorCompare);
  router.post('/customermodule/promoComaparewithoutCust',promotorController.getPromotorCompareWithoutCust);
  router.post('/customermodule/storeComapare',promotorController.getStoreCompare);
  router.post('/customermodule/promotorWeekly',promotorController.getPromotorWeekly);
  router.post('/customermodule/promotorSalesQty',promotorController.getPromotorSalesQty);
  router.post('/customermodule/promotorSalesAmt',promotorController.getPromotorSalesAmt);
  router.get('/customermodule/allpromotor',promotorController.getAllPromotor);
  router.get('/customermodule/allStores',promotorController.getAllStore);
  router.post('/customermodule/storeComparewithoutcust',promotorController.getStoreCompareWithoutCustomer);

  // router.post('/customermodule/nearExpiray',isAuthorized,promotorController.getNearExpirayDaat);
}
