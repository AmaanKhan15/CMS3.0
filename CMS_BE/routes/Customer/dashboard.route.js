const dashboardController=require('../../controllers/Customer/dashboard.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{
  router.post('/customermodule/dashboard',dashboardController.postdashboardRecords);
  router.post('/customermodule/LoginReportMerchand',dashboardController.getLoginReportMerchand);
  router.post('/customermodule/LoginReportPromotor',dashboardController.getLoginReportPromotor);
  router.post('/customermodule/LoginReportMerchandCustomer',dashboardController.getLoginReportMerchandCustomer);
  router.post('/customermodule/LoginReportPromotorCustomer',dashboardController.getLoginReportPromotorCustomer);
}
