const comparisonApiController=require('../../controllers/PromotorApp/comparisonApi.controller');

module.exports=(router)=>{ 

  //toltal_sales_data 
  router.post('/promotor/getWeeklySalesSummery',comparisonApiController.postWeeklySalesSummery);
  router.post('/promotor/getDailySalesSummery',comparisonApiController.postSalesSummeryDaily);
  router.post('/promotor/getQuarterlySalesSummery',comparisonApiController.postSalesSummeryYear);
  
  //run_rate_data getDailySalesSummery 
  router.post('/promotor/getWeeklyRunrateSummery',comparisonApiController.postWeeklyRunrate);
  router.post('/promotor/getQuarterlyRunrateSummery',comparisonApiController.postQuarterlyRunrate);

  
  
}
