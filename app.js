const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const config      = require('./config');
const user        = require('./models/user')
//-------------------------------------------------------------------

console.log('app is starting...')

//  Set the PORT variable
var port = process.env.PORT || config.port;
exports.port = port;

// Connect to Database
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()
{
  console.log('database connected!')
});
exports.db = db;

// Load API
var router = require('./api')
console.log('api loaded!')

// App Settings
app.set('view engine', 'pug');
app.set('secret', config.secret);

var loggedin = false;
exports.loggedin = loggedin;
// App Middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Session Settings

// Establish Routes
app.use('/',router.router)
console.log('routes established!');

app.listen(port);
console.log('app starting listening on port: ' + port)
console.log('visit http://localhost:'+port);
