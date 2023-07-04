const targetassignedController=require('../controllers/targetassignedpromo.controller');
module.exports=(router)=>{
  router.get('/targetassigned',targetassignedController.getRecords);
  router.get('/targetassigned/:targetId',targetassignedController.getRecordsById)
  router.post('/targetassigned',targetassignedController.postRecords);
  router.put('/targetassigned/:targetId',targetassignedController.updateRecords);
  router.delete('/targetassigned/:id', targetassignedController.deleteRecords);
}
