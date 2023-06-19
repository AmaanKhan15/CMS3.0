const assignedstoreController=require('../../controllers/SalesmanApp/assignedstore.controller');
const isAuthorized = require('../../middlewares/authenticateToken');
const blacklistToken = require('../../middlewares/blackListToken');

module.exports=(router)=>{
 
  router.post('/salesman/assigedStore',isAuthorized,assignedstoreController.postRecords);
  router.post('/salesman/getCategories',isAuthorized,assignedstoreController.postRecordsforCategory);
  router.post('/salesman/getProduct',isAuthorized,assignedstoreController.postRecordsforProduct);
  router.post('/salesman/getSKU',isAuthorized,assignedstoreController.postRecordsforSKU);
  router.post('/salesman/skuDynamicFields',isAuthorized,assignedstoreController.postRecordsskuDynamicFields);
  router.post('/salesman/skuAvailability',isAuthorized,assignedstoreController.postSkuAvailability);
  router.post('/salesman/logout', blacklistToken,assignedstoreController.logoutmerchand )

}
