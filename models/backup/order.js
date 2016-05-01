var connection = require('../connection');

function Order() {
    this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('select * from order_bill', function(err, result) {
                con.release();
                callback(result);
            });
        });
    };
}

module.exports = new Order();