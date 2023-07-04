const skuController=require('../controllers/sku.controller');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/exceldata/merchandiser');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var fileFilter = (req, file, callback) => {
  if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
    req.fileValidationError = 'Wrong extension type!';
    return callback(null, false);
  }
  callback(null, true);
};
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');

module.exports=(router)=>{
  router.get('/sku',skuController.getRecords);
  router.get('/sku/:skuId',skuController.getRecordsById)
  router.post('/skuSelected',skuController.getStoresSku)
  router.post('/sku',skuController.postRecords);
  router.post('/bulk_upload_sku',upload,skuController.postBulkRecords);
  router.put('/sku/:skuId',skuController.updateRecords);
  router.delete('/sku/:id', skuController.deleteRecords);
  router.get('/skubycustomer/:id', skuController.skubyCustomerController);

}
