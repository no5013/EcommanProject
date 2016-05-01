var connection = require('../connection');

function Order() {
    this.get = function(callback) {
        connection.acquire(function(err, con) {
            con.query('select * from order_bill', function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.getOrdersFromShopId = function(shopId,callback) {
        connection.acquire(function(err, con) {
            con.query('SELECT ob.order_id , c.cus_name , DATE_FORMAT(ob.order_date,\'%m-%d-%Y\') as order_date , op.grand_price , ob.order_status FROM order_bill ob INNER JOIN (SELECT customer.cus_id ,customer.shop_id, customer.cus_name FROM customer WHERE customer.shop_id = ?) c ON ob.cus_id = c.cus_id INNER JOIN (SELECT oi.order_id , SUM(oi.amount*i.item_price) as grand_price FROM ordered_item oi INNER JOIN item i ON oi.item_id = i.item_id GROUP BY oi.order_id) op ON ob.order_id = op.order_id ORDER BY ob.order_id DESC ',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.getOrdersFromCusId = function(cusId,callback){
    	connection.acquire(function(err, con) {
            con.query('select * from order_bill where cus_id = ?',[cusId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }


    this.getOrdersInShopFromStatus = function(shopId,orderStatus,callback){
    	connection.acquire(function(err, con) {
            con.query('SELECT ob.order_id , c.cus_name , ob.order_date , op.grand_price , ob.order_status FROM order_bill ob INNER JOIN (SELECT customer.cus_id ,customer.shop_id, customer.cus_name FROM customer WHERE customer.shop_id = ?) c ON ob.cus_id = c.cus_id INNER JOIN (SELECT oi.order_id , SUM(oi.amount*i.item_price) as grand_price FROM ordered_item oi INNER JOIN item i ON oi.item_id = i.item_id GROUP BY oi.order_id) op ON ob.order_id = op.order_id WHERE ob.order_status = ? ORDER BY ob.order_id DESC ',[shopId,orderStatus], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.getOrdersFromCusIdAndStatus = function(cusId,orderStatus,callback){
        connection.acquire(function(err, con) {
            con.query('select * from order_bill where cus_id = ? and orderStatus = ?',[cusId,orderStatus], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }


    this.getSearchOrdersInShop = function(shopId,searchWord,callback){
        connection.acquire(function(err, con) {
            con.query('SELECT ob.order_id , c.cus_name , ob.order_date , op.grand_price , ob.order_status FROM order_bill ob INNER JOIN (SELECT customer.cus_id ,customer.shop_id, customer.cus_name FROM customer WHERE customer.cus_name like \'%'+searchWord+'%\') c ON ob.cus_id = c.cus_id INNER JOIN (SELECT oi.order_id , SUM(oi.amount*i.item_price) as grand_price FROM ordered_item oi INNER JOIN item i ON oi.item_id = i.item_id GROUP BY oi.order_id) op ON ob.order_id = op.order_id ORDER BY ob.order_id DESC ',[cusId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.addOrderToShop = function(order,callback){
            connection.acquire(function(err, con) {
            con.query('INSERT INTO `order_bill` (`order_id`, `cus_id`, `order_date`, `order_status`, `order_discount`, `shipping_cost`) VALUES (NULL, ?, CURRENT_TIMESTAMP, ?, ?, ?)',[order.cusName,'ordered',order.shipCost , order.discount], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.addItemToOrder = function(orderId,itemId,amount,callback){
        connection.acquire(function(err, con) {
            con.query('INSERT INTO `ordered_item` (`ordered_item_id`, `order_id`, `item_id`, `amount`) VALUES (NULL, ?, ?, ?)',[orderId,itemId,amount], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }
}

module.exports = new Order();