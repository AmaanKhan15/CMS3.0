const usersController=require('../controllers/user.controller');
module.exports=(router)=>{
  router.get('/users',usersController.getRecords);
  router.get('/users/:usersId',usersController.getRecordsById)
  router.post('/users',usersController.postRecords);
  router.put('/users/:usersId',usersController.updateRecords);
  router.delete('/users/:id', usersController.deleteRecords);
    router.put('/users',usersController.updateRecordsByUsername);

}
