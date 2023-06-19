const salesmanController = require('../controllers/salesman.controller');
const multer = require('multer');
const {body}=require('express-validator')
const {validate}=require('../config/validate');
const salesmaniser = require('../models/salesman.model');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/exceldata/salesman');
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
  router.get('/salesman', salesmanController.getRecords);
  router.get('/Unassignedsalesman', salesmanController.getRecordUnassigned);
  router.get('/salesman/:salesmanId', salesmanController.getRecordsById)
  router.get('/salesmanbycustomer/:salesmanId', salesmanController.getRecordsByCustomer)
  router.post('/bulk_upload_salesman',upload, salesmanController.postBulkRecords)
  router.post('/salesman',validate([      
      body('username').custom(value => {
        return salesmaniser.findOne({ where: {username: value} }).then(user => {
          if (user) {
            return Promise.reject('User Name already in use');
          }
        });
      }),
  ]), salesmanController.postRecords);
  router.put('/salesman/:salesmanId', salesmanController.updateRecords);
//   router.put('/salesmanByUsersup/:salesmanId', salesmanController.updateCustomerIdforsalesmaniser);
//   router.put('/salesmanByStoregroup/:salesmanId', salesmanController.updateStoreGroupIdforsalesmaniser);
  router.put('/salesmanBySupervisor/:superId', salesmanController.updateSuperIdRecords);
  router.delete('/salesman/:id', salesmanController.deleteRecords);
}
