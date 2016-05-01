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
	var  newOrder = {
            cusName: req.body.cusName,
            shipCost: req.body.shipCost,
            discount: req.body.discount
   }

   var orderId;
   order.addOrderToShop( newOrder , function(result){
   		orderId = result.insertId;
   });

   var item1 = {
   	        itemcode: req.body.itemcode1,
            amount: req.body.amount1
   }

   return res.json({msg: 'done' , insertId: result.insertId} )

   //console.log(order);
});

module.exports = router;