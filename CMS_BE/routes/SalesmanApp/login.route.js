const loginController=require('../../controllers/SalesmanApp/login.controller');
module.exports=(router)=>{
  router.post('/salesman/login',loginController.postRecords);
  router.post('/salesman/profile',loginController.getProfile);
}
