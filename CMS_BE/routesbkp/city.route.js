const cityController=require('../controllers/city.controller');
// const isAuthorized = require("../controllers/requestAuthenticator");

module.exports=(router)=>{
  router.get('/city',cityController.getRecords);
  router.get('/city/:cityId',cityController.getRecordsById)
  router.post('/city',cityController.postRecords);
  router.put('/city/:cityId',cityController.updateRecords);
  router.delete('/city/:id', cityController.deleteRecords);
}
