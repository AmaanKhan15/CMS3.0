const assignedstoreController=require('../../controllers/PromotorApp/skuentry.controller');
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
      }
    ]
  )
  
module.exports=(router)=>{
    
  router.post('/promotor/shelfProduct',isAuthorized,assignedstoreController.postRecordsShelfProduct);
  router.post('/promotor/refrigeratorProduct',isAuthorized,assignedstoreController.postRecordsRefrigeratorProduct);
  router.post('/promotor/floorProduct',isAuthorized,assignedstoreController.postRecordsFloorProduct);
  router.post('/promotor/wareHouseEntry',upload1,isAuthorized,assignedstoreController.postWareHouse);
  router.post('/promotor/imageUpload',upload1,isAuthorized,assignedstoreController.postImages);
  router.post('/promotor/skuSubmittedList',isAuthorized,assignedstoreController.postSubmittedSku);
}
