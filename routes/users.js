var express = require('express');
var router = express.Router();

var user = require('../models/user');

router.get('/', function(req, res) {
    if(!req.session.username) {
        return res.redirect('/login');
    } else {
    stock.get(req.session.shopId,function(result) {   	
    	return res.render('stock', {stocks: result});
    });
    }
});

router.get('/:id', function(req, res) {

});

module.exports = router;