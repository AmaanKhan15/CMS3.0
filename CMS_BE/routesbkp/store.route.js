const storeController=require('../controllers/store.controller');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("I am in disskstorage");
    callback(null, './assets/exceldata/stores');
  },
  filename: function (req, file, callback) {
    let fieldname,originalname;
    console.log("Multer data is",file)
    console.log("Multer data is",file.name)
    if(file.name){
      fieldname='file';
    }
    if(file.fieldname){
      fieldname=file.fieldname;
    }
    if(file.originalname){
      originalname=file.originalname;
    }
    callback(null, fieldname + '-' + Date.now() + '.' + originalname.split('.')[originalname.split('.').length - 1])
  }

});
var fileFilter = (req, file, callback) => {
  console.log("file data is fresh",file)
  let orignalName;
  if(file.originalname){
    orignalName=file.originalname;
  }
  if(file.name){
    orignalName=file.name;
  }
  if (['xls', 'xlsx'].indexOf(orignalName.split('.')[orignalName.split('.').length - 1]) === -1) {
    req.fileValidationError = 'Wrong extension type!';
    return callback(null, false);
  }
  callback(null, true);
};
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');
console.log("Uplod is ",upload)
module.exports=(router)=>{
  router.get('/store',storeController.getRecords);
  router.get('/store/:storeId',storeController.getRecordsById)
  router.get('/storesbycustomer/:storeId',storeController.getRecordsByCustomer)
  router.get('/Unassignedstore',storeController.getUnassignedStoreRecords)
  router.post('/store',storeController.postRecords);
  router.put('/store/:storeId',storeController.updateRecords);
  router.put('/removeStore/:storeId',storeController.removeCustomerRecords);
  router.delete('/store/:id', storeController.deleteRecords);
  router.post('/bulk_upload_store',upload,storeController.postBulkRecords);

}
