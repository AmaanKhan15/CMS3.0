const assignedpromotorController=require('../controllers/assignedpromotor.controller');
module.exports=(router)=>{
  router.get('/assignedpromotor',assignedpromotorController.getRecords);
  router.get('/assignedpromotor/:assignedpromotorId',assignedpromotorController.getRecordsById)
  router.post('/assignedpromotor',assignedpromotorController.postRecords);
  router.put('/assignedpromotor/:assignedpromotorId',assignedpromotorController.updateRecords);
  router.delete('/assignedpromotor/:id', assignedpromotorController.deleteRecords);
}
