const promotorstoresController=require('../controllers/promotorstores.controller');
module.exports=(router)=>{
  router.get('/promotorStores',promotorstoresController.getRecords);
  router.get('/promotorStores/:promotorstoresId',promotorstoresController.getRecordsById)
  router.post('/promotorStores',promotorstoresController.postRecords);
  router.put('/promotorStores/:promotorstoresId',promotorstoresController.updateRecords);
  router.delete('/promotorStores/:id', promotorstoresController.deleteRecords);
}
