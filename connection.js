var mysql = require('mysql');
// Connection to mysql

function Connection() {
    this.pool = null;
    
    this.init = function() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ecomman'
        });
    };
    
    this.acquire = function(callback) {
        this.pool.getConnection(function(err, con){
            callback(err, con);
        });
    };
}

module.exports = new Connection();