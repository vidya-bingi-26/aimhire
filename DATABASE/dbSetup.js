const mysql = require('mysql');

function dbConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_portal'
    })
    connection.connect();
        return connection;
}

module.exports = dbConnection;