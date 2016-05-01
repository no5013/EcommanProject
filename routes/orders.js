var express = require('express');
var router = express.Router();

var order = require('../models/order');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
         order.getOrdersFromShopId(req.session.shopId,function(result){
         	return res.render('order', {orders: result , orderss: result});
         });
    }
});

router.post('/', function(req, res) {
	var  order = {
            cusName: req.body.cusName,
            shipCost: req.body.shipCost,
            discount: req.body.discount,
            itemcode1: req.body.itemcode1,
            amount1: req.body.amount1
   }

   console.log(order);
});

module.exports = router;