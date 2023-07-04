const dashboardController=require('../../controllers/Customer/dashboard.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
  router.post('/customermodule/dashboard',dashboardController.postdashboardRecords);
  router.get('/customermodule/LoginReportMerchand',dashboardController.getLoginReportMerchand);
  router.get('/customermodule/LoginReportPromotor',dashboardController.getLoginReportPromotor);
  router.post('/customermodule/LoginReportMerchandCustomer',dashboardController.getLoginReportMerchandCustomer);
  router.post('/customermodule/LoginReportPromotorCustomer',dashboardController.getLoginReportPromotorCustomer);
}
