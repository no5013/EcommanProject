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

router.get('/search', function(req, res) {
    if(!req.session.username) {
        return res.redirect('/login');
    }
     else {    
        return res.redirect('/customers');
    }
});

router.get('/search/:searchWord', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
         customer.getSearchedCustomersInShopFromName(req.session.shopId,req.params.searchWord,function(result){
         	return res.render('customer', {customers: result});
         });
    }
});

router.post('/', function(req, res) {

   var cus = {
            name: req.body.name,
            face: req.body.face,
            shipName: req.body.shipName,
            email: req.body.email,
            addr: req.body.addr,
            img: "google"
   }

   console.log(cus);

    customer.addCustomerToShop(req.session.shopId,cus,function(result) {  
         return res.json({msg: 'done' , insertId: result.insertId} )
    });
});

router.get('/:id', function(req, res) {

});


module.exports = router;