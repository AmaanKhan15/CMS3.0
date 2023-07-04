const skuthumbController=require('../controllers/skuthumb.controller');
module.exports=(router)=>{
  router.get('/skuthumb',skuthumbController.getRecords);
  router.get('/skuthumb/:skuthumbId',skuthumbController.getRecordsById)
  router.post('/skuthumb',skuthumbController.postRecords);
  router.put('/skuthumb/:skuthumbId',skuthumbController.updateRecords);
  router.delete('/skuthumb/:id', skuthumbController.deleteRecords);
}
