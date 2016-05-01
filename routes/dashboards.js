var express = require('express');
var router = express.Router();

var order = require('../models/order');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
    	
         return res.render('dashboard');
    }
});

module.exports = router;