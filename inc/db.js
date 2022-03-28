const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'db', //name do docker db
    port: 3306,
    user: 'alteon',
    database: 'saboroso',
    password: 'alteon',
    multipleStatements: true
});

module.exports = connection;