const assignedmerchandController=require('../controllers/assignmerchandiser.controller');
module.exports=(router)=>{
  router.get('/assignedmerchand',assignedmerchandController.getRecords);
  router.get('/assignedmerchand/:assignedmerchandId',assignedmerchandController.getRecordsById)
  router.post('/assignedmerchand',assignedmerchandController.postRecords);
  router.put('/assignedmerchand/:assignedmerchandId',assignedmerchandController.updateRecords);
  router.delete('/assignedmerchand/:id', assignedmerchandController.deleteRecords);
}
