const merchandController = require('../controllers/merchand.controller');
const multer = require('multer');
const {body}=require('express-validator')
const {validate}=require('../config/validate');
const Merchandiser = require('../models/merchandiser.model');
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

module.exports = (router) => {
  router.get('/merchand', merchandController.getRecords);
  router.get('/Unassignedmerchand', merchandController.getRecordUnassigned);
  router.get('/merchand/:merchandId', merchandController.getRecordsById)
  router.get('/merchandbycustomer/:merchandId', merchandController.getRecordsByCustomer)
  router.post('/bulk_upload_merchand',upload, merchandController.postBulkRecords)
  router.post('/merchand',validate([      
      body('username').custom(value => {
        return Merchandiser.findOne({ where: {username: value} }).then(user => {
          if (user) {
            return Promise.reject('User Name already in use');
          }
        });
      }),
  ]), merchandController.postRecords);
  router.put('/merchand/:merchandId', merchandController.updateRecords);
  router.put('/merchandByUsersup/:merchandId', merchandController.updateCustomerIdforMerchandiser);
  router.put('/merchandByStoregroup/:merchandId', merchandController.updateStoreGroupIdforMerchandiser);
  router.put('/merchandBySupervisor/:superId', merchandController.updateSuperIdRecords);
  router.delete('/merchand/:id', merchandController.deleteRecords);
}
