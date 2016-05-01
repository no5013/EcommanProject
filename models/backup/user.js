var connection = require('../connection');

function User() {
    this.get = function(query, callback) {
        var username = query.username != '' || typeof(query.username) !== 'undefined' ? query.username : '';

        connection.acquire(function(err, con) {
            //con.query('select * from owner where username = ?', [username], function(err, result) {
                con.query('select * from owner', function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

    this.authenticate = function(username, password, callback) {
    	connection.acquire(function(err, con) {
            con.query('select username from owner where username = ? and password = ?',
             [username, password], function(err, result) {
                con.release();
                callback(typeof result !== 'undefined' && result.length > 0);
            });
        });
    };
}

module.exports = new User();