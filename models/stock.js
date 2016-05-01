var connection = require('../connection');

function Stock() {
    this.get = function(callback) {
        connection.acquire(function(err, con) {
            con.query('select * from item', function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

    this.getStockFromShopId = function(shopId,callback) {
    	connection.acquire(function(err, con) {
            con.query('select * from item where shop_id=?',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    //not finish
    this.getItemsFromOrder = function(orderId,callback) {
        connection.acquire(function(err, con) {
            con.query('select * from item where shop_id=?',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.getSearchedItemsInShop = function(shopId,searchWord,callback){
                connection.acquire(function(err, con) {
                con.query('select * from item where shop_id=? and (item_name like \'%'+searchWord+'%\' or item_code like \'%'+searchWord+'%\' ) ',[shopId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    }

    this.addItemToStock = function(shopId,item,callback){

                console.log(item);
                connection.acquire(function(err, con) {
                con.query('INSERT INTO `item` (`item_id`, `shop_id`, `item_name`, `item_desc`, `item_price`, `item_weight`, `item_img`, `item_code`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',[shopId, item.name , item.desc , item.price , item.weight , item.img , item.code] , function(err, result) {
                con.release();
                callback(result);
            });
        });
    }
}

module.exports = new Stock();