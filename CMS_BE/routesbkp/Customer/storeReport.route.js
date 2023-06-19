const storeController=require('../../controllers/Customer/storesReport.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
  router.post('/customermodule/nearExpiry',storeController.getNearExpirayData);
  router.post('/customermodule/regionReport',storeController.getRegionReport);
  router.post('/customermodule/storeCompare',storeController.getStoreComapre);
  router.post('/customermodule/libraryofcollectedData',storeController.getLibraryOfCollectedData);
  router.post('/customermodule/unavailableSKU',storeController.getUnavailableSKU);
  // router.post('/customermodule/nearExpiray',promotorController.getNearExpirayDaat);
}
