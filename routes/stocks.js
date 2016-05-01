var express = require('express');
var router = express.Router();

// var stock = require('../models/stock');
var stock = require('../models/stock');

router.get('/', function(req, res) {
    if(!req.session.username) {
        return res.redirect('/login');
    } else {
    stock.getStockFromShopId(req.session.shopId,function(result) {   	
    	return res.render('stock', {stocks: result});
    });
    }
});

// router.get('/:shopId', function(req, res) {
// 	stock.getStockFromShopId(req.params.shopId,function(result) {   	
//     	res.send(result);
//     });
// });

router.get('/search', function(req, res) {
    if(!req.session.username) {
        return res.redirect('/login');
    }
     else {    
        return res.redirect('/stocks');
    }
});

router.get('/search/:searchWord', function(req, res) {
    if(!req.session.username) {
        return res.redirect('/login');
    }
     else {    
    stock.getSearchedItemsInShop(req.session.shopId,req.params.searchWord,function(result) {
        return res.render('stock', {stocks: result});
    });
    }
});

router.post('/', function(req, res) {

   var item = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            weight: req.body.weight,
            img: "google",
            code: req.body.code
   }

   console.log(item);

    stock.addItemToStock(req.session.shopId,item,function(result) {       
         return res.json({msg: 'done'})
    });
});

module.exports = router;