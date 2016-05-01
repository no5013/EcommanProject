var connection = require('../connection');

function Customer() {

	this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('SELECT i.item_name , SUM(ordered_item.amount) as amount FROM ordered_item INNER JOIN ( SELECT item.item_id,item.shop_id,item.item_name FROM item ) i ON ordered_item.item_id = i.item_id WHERE i.shop_id = ? GROUP BY ordered_item.item_id ORDER BY amount DESC ',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

}

module.exports = new Customer();