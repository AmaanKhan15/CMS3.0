const customerController=require('../controllers/customerdetail.controller');
module.exports=(router)=>{
  router.get('/customer',customerController.getRecords);
  router.get('/customerList',customerController.getCustomerList);
  router.get('/customer/:CustomerId',customerController.getRecordsById)
  router.get('/latestcustomer',customerController.getLatestRecords)
  router.put('/supervisorBycustomer/:CustomerId',customerController.updateSupervisorValue);
  router.post('/customer',customerController.postRecords);
  router.put('/customer/:CustomerId',customerController.updateRecords);
  router.delete('/customer/:id', customerController.deleteRecords);
}
