var express     = require('express');
var app         = express();
var path    = require("path");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./config');

//  setup ports and databases, initialize
var port = process.env.PORT || config.port;
console.log('app is starting...')

// use mongoose to connect
mongoose.connect(config.database);
var db = mongoose.connection;



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected!')
});

var router = require('./api')
console.log('api loaded!')
exports.db = db;
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// routes
app.use('/',router)
console.log('routes established!');

app.listen(port);
console.log('app starting listening on port: ' + port)

console.log('visit http://localhost:'+port);
