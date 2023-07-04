const dashboardController=require('../controllers/dashboard.controller');
module.exports=(router)=>{
  router.get('/dashboardCard',dashboardController.getRecords);
  router.get('/trendingPromotor',dashboardController.getTrendingPromotor);
  router.post('/loginReport',dashboardController.getLoginReport);
//   New code Added by Azhar
  router.get("/trendingRecords", dashboardController.getTopRecords);
  router.get("/dashboardReport", dashboardController.getDashboardReport);
  
}
