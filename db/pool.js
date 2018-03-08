var mysql = require('mysql');
var dbConfig = require('./config.js');

var pool = mysql.createPool({
    connectionLimit : dbConfig.connectionLimit,
    host     : dbConfig.host,
    user     : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database,
    debug    : dbConfig.debug
});

module.exports = pool;