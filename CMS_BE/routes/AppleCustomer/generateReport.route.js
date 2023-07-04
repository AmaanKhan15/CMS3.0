const MacController=require('../../controllers/AppleCustomer/generateReport.controller');
const iPhoneController=require('../../controllers/AppleCustomer/generateiPhoneReport.controller');
const iPadController=require('../../controllers/AppleCustomer/generateiPadReport.controller');
const AirPodController=require('../../controllers/AppleCustomer/generateAirPodReport.controller');
const AppleTvController=require('../../controllers/AppleCustomer/generateAppleTvReport.controller');
const AppleCareController=require('../../controllers/AppleCustomer/AppleCareController.controller');
const iPodController=require('../../controllers/AppleCustomer/generateiPodReport.controller');
const AccessoriesController=require('../../controllers/AppleCustomer/generateAccessoriesReport.controller');
const AppleWatchController=require('../../controllers/AppleCustomer/generateWatchReport.controller');

module.exports=(router)=>{
  //Mac Reports
  router.post('/applecustomer/MacReportWeekly',MacController.getMacReportWeek);
  router.post('/applecustomer/MacReportQuater',MacController.getMacReportQuater);

  //iPhone Reports
  router.post('/applecustomer/iPhoneReportWeekly',iPhoneController.getiPhoneReportWeek);
  router.post('/applecustomer/iPhoneReportQuater',iPhoneController.getiPhoneReportQuater);
  
  //iPad Reports
  router.post('/applecustomer/iPadReportWeekly',iPadController.getipadReportWeek);
  router.post('/applecustomer/iPadReportQuater',iPadController.getipadReportQuater);
  
  //AirPod Reports
  router.post('/applecustomer/AirPodReportWeekly',AirPodController.getAirPodsReportWeek);
  router.post('/applecustomer/AirPodReportQuater',AirPodController.getAirPodsReportQuater);

  //Apple Tv Reports
  router.post('/applecustomer/AppleTvReportWeekly',AppleTvController.getAppleTVReportWeek);
  router.post('/applecustomer/AppleTvReportQuater',AppleTvController.getAppleTVReportQuater);
  
  //AppleCare+ Reports
  router.post('/applecustomer/AppleCareReportWeekly',AppleCareController.getAppleCareReportWeek);
  router.post('/applecustomer/AppleCareReportQuater',AppleCareController.getAppleCareReportQuater);
  
  
  //AppleCare+ Reports
  router.post('/applecustomer/iPodReportWeekly',iPodController.getiPodReportWeek);
  router.post('/applecustomer/iPodReportQuater',iPodController.getiPodReportQuater);
  
  
  //AppleCare+ Reports
  router.post('/applecustomer/AccessoriesReportWeekly',AccessoriesController.getAccessoriesReportWeek);
  router.post('/applecustomer/AccessoriesReportQuater',AccessoriesController.getAccessoriesReportQuater);
  
  
  //AppleCare+ Reports
  router.post('/applecustomer/AppleWatchReportWeekly',AppleWatchController.getAppleWatchReportWeek);
  router.post('/applecustomer/AppleWatchReportQuater',AppleWatchController.getAppleWatchReportQuater);


  }
