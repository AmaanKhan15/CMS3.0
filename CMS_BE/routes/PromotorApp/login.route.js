const loginController=require('../../controllers/PromotorApp/login.controller');
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
  router.post('/promotor/login',loginController.postRecords);
  router.post('/promotor/profile',loginController.getProfile);
  router.post('/promotor/currentlocation',isAuthorized,loginController.getCurrentLocation);
}
