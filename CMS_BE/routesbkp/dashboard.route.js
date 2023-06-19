const dashboardController=require('../controllers/dashboard.controller');
module.exports=(router)=>{
  router.get('/dashboardCard',dashboardController.getRecords);
  router.get('/trendingPromotor',dashboardController.getTrendingPromotor);
  router.post('/loginReport',dashboardController.getLoginReport);
}
