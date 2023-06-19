// const Mysqli = require('mysql2');
const jwt = require('jsonwebtoken');
const log4js=require('log4js')
const multer=require('multer');

log4js.configure({
    appenders: {
      everything: { type: 'dateFile', filename: 'log/all-the-logs.log', pattern: '.yyyy-MM-dd-hh', compress: true }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'debug'}
    }
  });
  
const logger=log4js.getLogger();


module.exports = {
    logger:logger,
    fileStorage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('here');
            cb(null, './assets/images')
        },
        filename: (req, file, cb) => {
            // cb(null, new Date().toISOString() + '-' + file.originalname)
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
  
};
