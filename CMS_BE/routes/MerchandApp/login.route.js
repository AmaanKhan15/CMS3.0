const loginController=require('../../controllers/MerchandApp/login.controller');
module.exports=(router)=>{
  router.post('/merchand/login',loginController.postRecords);
  router.post('/merchand/profile',loginController.getProfile);
}
