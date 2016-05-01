var connection = require('../connection');

function Customer() {

	this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('SELECT order_bill.order_status , COUNT(order_id) FROM order_bill GROUP BY order_bill.order_status', function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

}

module.exports = new Customer();