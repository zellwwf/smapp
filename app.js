exports = module.exports = {};
var express     = require('express');
var app         = express();
var router = require('./router')
var path    = require("path");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var everify = require('email-verification')(mongoose);
var jwt    = require('jsonwebtoken');
var config = require('./config');

//  setup ports and databases, initialize
var port = process.env.PORT || config.port;
console.log('server starting listening on port: ' + port)

// use mongoose to connect
mongoose.connect(config.database);
var db = mongoose.connection

exports.db = db;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// routes
app.use('/',router)

app.listen(port);
console.log('routes established!');
