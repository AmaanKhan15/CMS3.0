// require('dotenv').config()
// const mysql = require("mysql");

// module.exports = {
//  poolReq: mysql.createPool({
//     connectionLimit: 100,
//     waitForConnections: true,
//     queueLimit: 0,
//     host:process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_DATA,
//     debug: false,
//     wait_timeout: 28800,
//     connect_timeout: 10
// })
// }
require('dotenv').config()
const mysql = require("mysql");

module.exports = {
 poolReq: mysql.createPool({
    connectionLimit: 100,
    waitForConnections: true,
    queueLimit: 0,
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATA,
    debug: false,
    wait_timeout: 2880000,
    connect_timeout: 10,
    max: 100,
    min: 0,
    // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
    acquire: 100*1000000,
})
}
