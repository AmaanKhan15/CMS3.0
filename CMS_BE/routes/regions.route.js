const regionsController=require('../controllers/region.controller');
module.exports=(router)=>{
  router.get('/regions',regionsController.getRecords);
  router.get('/regions/:regionsId',regionsController.getRecordsById)
  router.post('/regions',regionsController.postRecords);
  router.put('/regions/:regionsId',regionsController.updateRecords);
  router.delete('/regions/:id', regionsController.deleteRecords);
}
