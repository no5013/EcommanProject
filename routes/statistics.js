var express = require('express');
var router = express.Router();

//var statistic = require('../models/statistic');

router.get('/', function(req, res) {
    if(!req.session.username) {
         return res.redirect('/login')
    } else {
         return res.render('statistic');
    }
});

module.exports = router;