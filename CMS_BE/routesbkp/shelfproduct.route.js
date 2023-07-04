const shelfproductController=require('../controllers/shelfproduct.controller');
module.exports=(router)=>{
  router.get('/shelfproduct',shelfproductController.getRecords);
  router.get('/shelfproduct/:shelfproductId',shelfproductController.getRecordsById)
  router.post('/shelfproduct',shelfproductController.postRecords);
  router.put('/shelfproduct/:shelfproductId',shelfproductController.updateRecords);
  router.delete('/shelfproduct/:id', shelfproductController.deleteRecords);
}
