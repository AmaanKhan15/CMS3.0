const floorproductController=require('../controllers/floorproduct.controller');
module.exports=(router)=>{
  router.get('/floorproduct',floorproductController.getRecords);
  router.get('/floorproduct/:floorproductId',floorproductController.getRecordsById)
  router.post('/floorproduct',floorproductController.postRecords);
  router.put('/floorproduct/:floorproductId',floorproductController.updateRecords);
  router.delete('/floorproduct/:id', floorproductController.deleteRecords);
}
