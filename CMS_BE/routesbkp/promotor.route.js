const promotorController=require('../controllers/promotor.controller');
const multer = require('multer');
const {body}=require('express-validator')
const {validate}=require('../config/validate');
const Promotor = require('../models/promotor.model');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/exceldata/promotors');
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
  router.get('/promotor',promotorController.getRecords);
  router.get('/promotor/:promotorId',promotorController.getRecordsById)
  router.get('/Unassignedpromotor',promotorController.getRecordsOfUnassignedPromotor)
  router.get('/promotorbyCustomer/:promotorId',promotorController.getRecordsByCustomer)
  router.get('/promotorbyCustomerId/:promotorId',promotorController.getRecordsByCustToPromotor)
  router.post('/promotor',validate([
    body('username').custom(value => {
      return Promotor.findOne({ where: {username: value} }).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),

  ]),promotorController.postRecords);
  router.post('/promotor/bulk_upload_store',upload,promotorController.postBulkRecords);
  router.put('/promotor/:promotorId',promotorController.updateRecords);
  router.put('/removePromotor/:promotorId/:customerId',promotorController.updateAssignedPromotors);
  router.put('/promotorByUsersup/:promotorId', promotorController.updateCustomerIdforPromotor);
  router.put('/promotorByStoregroup/:promotorId', promotorController.updateStoreGroupIdforPromotor);
  router.put('/promotorBySupervisorId/:superId', promotorController.updateSuperIdRecords);
  router.get('/promotorSingleReport/:promotorId',promotorController.promotorSingleReport)
  router.delete('/promotor/:id', promotorController.deleteRecords);
}
