const loginActivityController=require('../../controllers/LoginActivity/loginactivities.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');
const blacklistToken=require('../../middlewares/blackListToken');

module.exports=(router)=>{
  router.post('/Logout',blacklistToken,loginActivityController.simpleLogout);
  router.post('/Currentlogins',isAuthorized,loginActivityController.userCurrentLogins);
  router.post('/LogoutAllDevices',isAuthorized,loginActivityController.LogoutAllDevices);
}
