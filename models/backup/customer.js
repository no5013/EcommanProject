var connection = require('../connection');

function Customer() {
    this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('select * from customer where shop_id=?',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };
}

module.exports = new Customer();