var express = require('express');
var router = express.Router();

var dashboard = require('../models/dashboard');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
    	// dashboard.get(function(result){
    	// 	console.log(result);
    	// 	
    	// });
         return res.render('dashboard');	
    }
});

module.exports = router;