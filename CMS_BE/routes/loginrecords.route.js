const loginrecordController=require('../controllers/loginrecords.controller');
module.exports=(router)=>{
  router.get('/loginrecord',loginrecordController.getRecords);
  router.get('/loginrecord/:loginrecordId',loginrecordController.getRecordsById)
  router.post('/loginrecord',loginrecordController.postRecords);
  router.put('/loginrecord/:loginrecordId',loginrecordController.updateRecords);
  router.delete('/loginrecord/:id', loginrecordController.deleteRecords);
}
