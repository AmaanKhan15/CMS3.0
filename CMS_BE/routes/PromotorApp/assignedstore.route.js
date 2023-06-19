const assignedstoreController=require('../../controllers/PromotorApp/assignedstore.controller');
const isAuthorized = require('../../middlewares/authenticateToken');
const blacklistToken=require('../../middlewares/blackListToken');
const multer = require('multer');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './assets/images');
    },
    filename: function (req, file, callback) {
      if(file.originalname.length>6)
        callback(null, file.fieldname + '-' + Date.now()+'-' + file.originalname.substr(file.originalname.length-6,file.originalname.length));
      else
        callback(null, file.fieldname + '-' + Date.now() +'-'+ file.originalname);
  
      // callback(null,Date.now()+ '-' +file.originalname );
    }
    
  });
  var fileFilter = (req, file, cb) => {  
    console.log("Filee is",file)
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(null, false);
  }
  if(!file===null){
    req.fileValidationError = 'Please Select Image!';
      return cb(null, false);
  }
  cb(null, true);
  };
  var upload1 = multer(
    { 
      storage: storage, 
      limits:
        { 
          fileSize:'1mb' 
        }, 
        // fileFilter: fileFilter
        fileFilter: (req, file, cb) => {
          if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
          } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
          
        }
    }
  ).fields(
    [
      { 
        name: 'image1', 
        maxCount: 1 
      }, 
      { 
        name: 'image2', 
        maxCount: 1 
      },
      { 
        name: 'image3', 
        maxCount: 1 
      }
    ]
  )
  

module.exports=(router)=>{

  router.post('/promotor/assigedStore',isAuthorized,assignedstoreController.postRecords);
  router.post('/promotor/getCategories',isAuthorized,assignedstoreController.postRecordsforCategory);
  router.post('/promotor/getProduct',isAuthorized,assignedstoreController.postRecordsforProduct);
  router.post('/promotor/getSKU',isAuthorized,assignedstoreController.postRecordsforSKU);
  router.post('/promotor/NewSku',isAuthorized,assignedstoreController.postRecordsNewSKU);
  router.post('/promotor/skuDynamicFields',isAuthorized,assignedstoreController.postRecordsskuDynamicFields);
  router.post('/promotor/promotions',upload1,isAuthorized,assignedstoreController.postPromotionsUpload);
  router.post('/promotor/feedback',isAuthorized,assignedstoreController.postFeedback);
  router.post('/promotor/getFootfallChange',isAuthorized,assignedstoreController.postFootfallChange);
  router.post('/promotor/getSummeryChartWeekly',isAuthorized,assignedstoreController.postSummeryChartWeekly);

  // //toltal_sales_data 
  // router.post('/promotor/getTotalSalesQuarter',isAuthorized,assignedstoreController.posttotalSalesQuarter);
  // router.post('/promotor/getTotalSalesDaily',isAuthorized,assignedstoreController.posttotalSalesDaily);
  // router.post('/promotor/getTotalSalesYear',isAuthorized,assignedstoreController.posttotalSalesYear);
  // //run_rate_data
  // router.post('/promotor/getRunRateQuarter',isAuthorized,assignedstoreController.getWeeklyRunrate);
  // router.post('/promotor/getRunRateYear',isAuthorized,assignedstoreController.getWeeklyRunrate);

  router.post('/promotor/logout', isAuthorized,assignedstoreController.logoutpromotor )
}
