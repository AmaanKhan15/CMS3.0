const applecustomerController=require('../../controllers/AppleCustomer/allFilters.controller');

module.exports=(router)=>{
  router.get('/applecustomer/allRegions',applecustomerController.getAllRegions);
  router.get('/applecustomer/allProductMac',applecustomerController.getAllProductMac);
  router.get('/applecustomer/allProductAccessories',applecustomerController.getAllProductAccessories);
  router.get('/applecustomer/allProductAirPods',applecustomerController.getAllProductAirPods);
  router.get('/applecustomer/allProductAppleTV',applecustomerController.getAllProductAppleTV);
  router.get('/applecustomer/allProductAppleWatchBands',applecustomerController.getAllProductAppleWatchBands);
  router.get('/applecustomer/allProductAppleCare',applecustomerController.getAllProductAppleCare);
  router.get('/applecustomer/allProductBeats',applecustomerController.getAllProductBeats);
  router.get('/applecustomer/allProductipad',applecustomerController.getAllProductipad);
  router.get('/applecustomer/allProductiPhone',applecustomerController.getAllProductiPhone);
  router.get('/applecustomer/allProductiPod',applecustomerController.getAllProductiPod);
}
