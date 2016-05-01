var express = require('express');
var path = require('path');
var pug = require('pug');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var connection = require('./connection');
var session = require('express-session');

//Import from routes folder
var routes = require('./routes/index');
var dashboards = require('./routes/dashboards');
var statistics = require('./routes/statistics');
var users = require('./routes/users');
var stocks = require('./routes/stocks');
var customers = require('./routes/customers');
var orders = require('./routes/orders');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieparser());
app.use(session({
	secret:'asdasdasd',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}));

app.set('views', './views');
app.set('view engine', 'pug');

connection.init();

//Init Routes
app.use('/', routes);
app.use('/dashboards' , dashboards);
app.use('/statistics', statistics);
app.use('/users', users);
app.use('/stocks', stocks);
app.use('/customers', customers);
app.use('/orders' , orders);


var server = app.listen(4000, function() {
    console.log('Server listening on port ' + server.address().port);
});
