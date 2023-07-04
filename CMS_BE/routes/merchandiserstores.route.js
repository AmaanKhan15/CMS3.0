const merchnadiserstoresController=require('../controllers/merchandiserStore.controller');
module.exports=(router)=>{
  router.get('/merchnadiserStores',merchnadiserstoresController.getRecords);
  router.get('/merchnadiserStores/:merchnadiserstoresId',merchnadiserstoresController.getRecordsById)
  router.post('/merchnadiserStores',merchnadiserstoresController.postRecords);
  router.put('/merchnadiserStores/:merchnadiserstoresId',merchnadiserstoresController.updateRecords);
  router.delete('/merchnadiserStores/:id', merchnadiserstoresController.deleteRecords);
}
