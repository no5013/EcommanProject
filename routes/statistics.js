var express = require('express');
var router = express.Router();

var statistic = require('../models/statistic');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {

    	statistic.get(req.session.shopId , function(result){

    		 return res.render('statistic',{bestSeller: result});
    	});

    }
});

module.exports = router;