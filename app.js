var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var everify = require('email-verification')(mongoose);
var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./objects/user');

//  setup ports and databases, initialize
var port = process.env.PORT || 2200;
mongoose.connect(config.database);
app.set('thisisasecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

everify.configure({
    verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'myawesomewebsite_tempusers',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'myawesomeemail@gmail.com',
            pass: 'mysupersecretpassword'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/testuser', function(req, res) {
  var tuser = new User({
    name: 'Abdulilah Azzazi',
    password: 'cowboyisdead',
  });


  tuser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.listen(port);
console.log('up and running! at http://localhost:' + port);
