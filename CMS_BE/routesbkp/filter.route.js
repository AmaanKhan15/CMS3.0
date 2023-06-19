const FilterController=require('../controllers/filters.controller');
module.exports=(router)=>{
  router.post('/FilterdData',FilterController.getFilteredData);
}
