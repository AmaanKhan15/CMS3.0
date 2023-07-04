const storegroupController=require('../controllers/storegroup.controller');
module.exports=(router)=>{
  router.get('/storegroup',storegroupController.getRecords);
  router.get('/storegroup/:storegroupId',storegroupController.getRecordsById)
  router.get('/storegroupbycustomer/:customerId',storegroupController.getRecordsCustomerById)
  router.post('/storegroup',storegroupController.postRecords);
  router.put('/storegroup/:storegroupId',storegroupController.updateRecords);
  router.delete('/storegroup/:id', storegroupController.deleteRecords);
}
