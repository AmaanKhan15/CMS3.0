const assignedstoreController=require('../../controllers/MerchandApp/skuentry.controller');
// const isAuthorized = require("../../controllers/requestAuthenticator");
const isAuthorized = require('../../middlewares/authenticateToken');

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
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
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
        fileFilter: fileFilter
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
      }
    ]
  )
  
module.exports=(router)=>{
    
  router.post('/merchand/shelfProduct',isAuthorized,assignedstoreController.postRecordsShelfProduct);
  router.post('/merchand/refrigeratorProduct',isAuthorized,assignedstoreController.postRecordsRefrigeratorProduct);
  router.post('/merchand/floorProduct',isAuthorized,assignedstoreController.postRecordsFloorProduct);
  router.post('/merchand/wareHouseEntry',upload1,isAuthorized,assignedstoreController.postWareHouse);
  router.post('/merchand/skuSubmittedList',isAuthorized,assignedstoreController.postSubmittedSku);
  router.post('/merchand/Nearexpiray',isAuthorized,assignedstoreController.getNearExpirayStock);
}
