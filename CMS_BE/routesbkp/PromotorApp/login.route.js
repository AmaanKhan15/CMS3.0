const loginController=require('../../controllers/PromotorApp/login.controller');
module.exports=(router)=>{
  router.post('/promotor/login',loginController.postRecords);
  router.post('/promotor/profile',loginController.getProfile);

}
