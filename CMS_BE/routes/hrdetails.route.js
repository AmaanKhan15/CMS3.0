const hrDetailsController=require('../controllers/Hr/hrDetails.controller');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/Hr');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var fileFilter = (req, file, callback) => {
  if (['pdf'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
    req.fileValidationError = 'Wrong extension type!';
    return callback(null, false);
  }
  callback(null, true);
};
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('resume');

module.exports=(router)=>{
  router.get('/hrdetails',hrDetailsController.getRecords);
  router.get('/shortListed',hrDetailsController.getShortlistRecords);
  router.get('/hrdetails/:role',hrDetailsController.getRecordsById)
  router.post('/hrdetails',upload,hrDetailsController.postRecords);
  router.put('/hrdetails/:hrdetailsId',hrDetailsController.updateRecords);
  router.delete('/hrdetails/:id', hrDetailsController.deleteRecords);
  router.put('/shortdetails/:id', hrDetailsController.shortlistRecords);
  router.get('/shortlistdetails', hrDetailsController.GetshortlistRecords);
}
