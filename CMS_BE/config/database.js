const Sequelize = require('sequelize').Sequelize;

require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  dialectOptions: {
    options: {
      requestTimeout: 6000
    }
  },
  pool: {
    max: 100,
    min: 0,
    // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
    acquire: 100*1000,
  }
 
  
});


module.exports = sequelize;
