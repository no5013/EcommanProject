var connection = require('../connection');

function Stock() {
    this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('select * from item where shop_id=?',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };
}

module.exports = new Stock();