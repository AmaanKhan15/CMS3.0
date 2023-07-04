const warehouseController=require('../controllers/warehouse.controller');
module.exports=(router)=>{
  router.get('/warehouse',warehouseController.getRecords);
  router.get('/warehouse/:warehouseId',warehouseController.getRecordsById)
  router.post('/warehouse',warehouseController.postRecords);
  router.put('/warehouse/:warehouseId',warehouseController.updateRecords);
  router.delete('/warehouse/:id', warehouseController.deleteRecords);
}
