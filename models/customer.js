var connection = require('../connection');

function Customer() {

	this.get = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('select * from customer', function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

    this.getCustomerFromShopId = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('SELECT customer.cus_name,customer.cus_facebook,customer.cus_shipping_name,customer.cus_address,customer.cus_img , cus_bill.num_bill FROM customer LEFT JOIN (SELECT order_bill.cus_id , COUNT(order_bill.order_id) as num_bill FROM order_bill GROUP BY order_bill.cus_id) cus_bill ON customer.cus_id=cus_bill.cus_id WHERE customer.shop_id=? ORDER BY customer.cus_name',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

    this.getSearchedCustomersInShopFromName = function(shopId,cusName,callback){
    	        connection.acquire(function(err, con) {
            	con.query('select * from customer where shop_id=? and cus_name like \'%'+cusName+'%\'',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.addCustomerToShop = function(shopId,cus,callback){
                connection.acquire(function(err, con) {
                con.query('INSERT INTO `customer` (`cus_id`, `shop_id`, `cus_name`, `cus_facebook`, `cus_shipping_name`, `cus_address`, `cus_img`) VALUES (NULL, ?, ?, ?, ?, ?, ?)',[shopId,cus.name,cus.face,cus.shipName,cus.addr,cus.img], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }
}

module.exports = new Customer();