const supervisorController=require('../controllers/supervisor.controller');
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
  router.get('/supervisor',supervisorController.getRecords);
  router.get('/supervisor/withNoCustsomer',supervisorController.getUnassignedSupervisor);
  router.get('/supervisor/:supervisorId',supervisorController.getRecordsById)
  router.post('/supervisor',supervisorController.postRecords);
  router.post('/bulk_upload_supervisor',upload,supervisorController.postBulkRecords);
  router.put('/supervisor/:supervisorId',supervisorController.updateRecords);
  router.put('/updatesupervisorwithcust/:supervisorId',supervisorController.updateSupervisorByCustomer);
  router.delete('/supervisor/:id', supervisorController.deleteRecords);
}
