const refregproductController=require('../controllers/refregproduct.controller');
module.exports=(router)=>{
  router.get('/refregproduct',refregproductController.getRecords);
  router.get('/refregproduct/:refregproductId',refregproductController.getRecordsById)
  router.post('/refregproduct',refregproductController.postRecords);
  router.put('/refregproduct/:refregproductId',refregproductController.updateRecords);
  router.delete('/refregproduct/:id', refregproductController.deleteRecords);
}

