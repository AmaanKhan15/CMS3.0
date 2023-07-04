const countryController=require('../controllers/country.controller');
module.exports=(router)=>{
  router.get('/country',countryController.getRecords);
  router.get('/country/:countryId',countryController.getRecordsById)
  router.post('/country',countryController.postRecords);
  router.put('/country/:countryId',countryController.updateRecords);
  router.delete('/country/:id', countryController.deleteRecords);
}
