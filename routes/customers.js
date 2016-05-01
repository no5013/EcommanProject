var express = require('express');
var router = express.Router();

var customer = require('../models/customer');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
         customer.getCustomerFromShopId(req.session.shopId,function(result){
            console.log(result);
         return res.render('customer', {customers: result});
         });
    }
});

module.exports = router;