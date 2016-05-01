var express = require('express');
var router = express.Router();

var user = require('../models/user');

router.get('/', function(req, res) {
	if(!req.session.username) {
		return res.redirect('login');
	}
	return res.render('main');
});

router.get('/login', function(req, res) {
	if(!req.session.username) {
		return res.render('login');
	}
	return res.redirect('/');
});

router.post('/login', function(req,res) {

	console.log(req.body)
	var username = req.body.username;
    var password = req.body.password;

    user.authenticate(username, password, function(result) {
        if(result) {
           sess = req.session;
           sess.username = username;
           sess.shopId = 1;
           return res.json({msg: 'done'});
        } else {
          return res.json({error: 'Invalid email or password'});
        }
    }); 
});

router.get('/logout', function(req, res) {
	if(req.session.username) {
		req.session.destroy(function(err) {
			if(err) {
				console.log(err);
			} else {
				return res.redirect('/');
			}
		});
	} else {
		return res.redirect('/');
	}
});

module.exports = router;