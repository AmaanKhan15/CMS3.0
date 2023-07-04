const assignedstoreController=require('../../controllers/MerchandApp/assignedstore.controller');
const isAuthorized = require('../../middlewares/authenticateToken');
const blacklistToken = require('../../middlewares/blackListToken');

module.exports=(router)=>{
 
  router.post('/merchand/assigedStore',isAuthorized,assignedstoreController.postRecords);
  router.post('/merchand/getCategories',isAuthorized,assignedstoreController.postRecordsforCategory);
  router.post('/merchand/getProduct',isAuthorized,assignedstoreController.postRecordsforProduct);
  router.post('/merchand/getSKU',isAuthorized,assignedstoreController.postRecordsforSKU);
  router.post('/merchand/skuDynamicFields',isAuthorized,assignedstoreController.postRecordsskuDynamicFields);
  router.post('/merchand/skuAvailability',isAuthorized,assignedstoreController.postSkuAvailability);
  router.post('/merchand/logout', assignedstoreController.logoutmerchand )

}
