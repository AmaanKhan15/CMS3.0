const appleapiController=require('../../controllers/PromotorApp/appleApi.controller');
const newappleapiController=require('../../controllers/PromotorApp/newappleapi.controller');
const isAuthorized = require('../../middlewares/authenticateToken');

module.exports=(router)=>{

  //toltal_sales_data 
  router.post('/promotor/getWeeklyTotalSales',newappleapiController.postWeeklyTotalSales);
  router.post('/promotor/getTotalSalesDaily',newappleapiController.posttotalSalesDaily);
  router.post('/promotor/getTotalSalesYear',newappleapiController.posttotalSalesYear);
  
  //run_rate_data
  router.post('/promotor/getWeeklyRunrate',newappleapiController.postWeeklyRunrate);
  router.post('/promotor/getQuarterlyRunrate',newappleapiController.postQuarterlyRunrate);

  //SOB
 router.post('/promotor/getWeeklySOB',newappleapiController.postWeeklySOB);
  router.post('/promotor/getDailySOB',newappleapiController.postDailySOB);
  router.post('/promotor/getQuarterlySOB',newappleapiController.postQuarterlySOB);
  
  
}
