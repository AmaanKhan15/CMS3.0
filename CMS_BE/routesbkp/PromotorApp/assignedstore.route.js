const assignedstoreController=require('../../controllers/PromotorApp/assignedstore.controller');
const isAuthorized = require('../../middlewares/authenticateToken');
const blacklistToken=require('../../middlewares/blackListToken');
module.exports=(router)=>{

  router.post('/promotor/assigedStore',isAuthorized,assignedstoreController.postRecords);
  router.post('/promotor/getCategories',isAuthorized,assignedstoreController.postRecordsforCategory);
  router.post('/promotor/getProduct',isAuthorized,assignedstoreController.postRecordsforProduct);
  router.post('/promotor/getSKU',isAuthorized,assignedstoreController.postRecordsforSKU);
  router.post('/promotor/NewSku',isAuthorized,assignedstoreController.postRecordsNewSKU);
  router.post('/promotor/skuDynamicFields',isAuthorized,assignedstoreController.postRecordsskuDynamicFields);
  router.post('/promotor/logout', blacklistToken,assignedstoreController.logoutpromotor )
}
