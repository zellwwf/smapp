var express     = require('express');
var router      = express.Router();
var path        = require("path");
var google      = require('googleapis');
var pug         = require('pug');
var bcrypt      = require('bcrypt');
var app         = require('./app');
var user        = require('./models/user');
var config      = require('./config');
//-------------------------------------------------------------------

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.oauth2_clientID, config.oauth2_client_secret, config.oauth2_callback)

// Pages
function registerPage(req,res,next)
{
  res.render('index.pug',{loggedin:app.loggedin, fullname:'', email:''});
}


function usersPage(req,res,next)
{
  if (app.loggedin)
  {
    //Aunthorized
    console.log('authorized user');
    res.render('users.pug')
  } else {
    //Aunthorized access
    console.log('unauthorized access');
    res.status(401).send('unauthorized access');
    res.render('users.pug', {message: 'unauthorized access'})
  }
}

// Functions & Actions
function googleAuth(req, res, next)
{
  console.log('signing up with google');
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  });
  res.redirect(url);
}
function registerUser(req,res,next)
{
  console.log('First, Check if user exists');
  user.checkUserExists(req.body.email, req.body, register);
  res.redirect('/')
}

function loginUser(req,res,next)
{
  if (app.loggedin) {
    console.log('already logged in');
  }
  app.loggedin = true;
  console.log('user logging in...');
  user.checkPassword(req.body.semail,req.body.spassword, login)
  res.redirect('/');
}


function logoutUser(req,res,next)
{
  console.log('user logging out...');
  app.loggedin = false;
  res.redirect('/')
}

function gcallback(req,res,next)
{
  var code = req.query.code;  //Extract google's code
  oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log('Error Obtaining tokens');
    } else {

      console.log('.. Obtaining google data');
      oauth2Client.setCredentials(tokens);
      var plus = google.plus('v1');

      plus.people.get({userId: 'me', auth: oauth2Client}, function(error, response){
        if (error) {
          console.log(error);
        } else {
          console.log('user data obtained');
          var name = response.name.givenName + ' ' + response.name.familyName;
          var email = response.emails[0].value;
          //redirect to homepage with the info
          res.render('index.pug',{fullname:name, email:email});
        }
      });
      //redirect after obtaining tokens?
    }

  });

}

//  -- callback: register
function register(userdata)
{
  console.log('registering a user');
  var userModel = app.db.model('User',user.UserSchema);
  var newUser = new userModel(userdata);

  var pass = user.hashPTPassword(newUser.password);
  newUser.password = pass;
  newUser.save();
}

//  -- callback: login
function login(err,isMatch)
{
  if (isMatch) {
  app.loggedin = true;
  console.log('logged in!');
 }
 else {
   app.loggedin = false;
   console.log('failed to log in!');
 }
}

// HTTP ROUTES
//  -- index post route (register)
router.get('/', registerPage);
router.post('/register', registerUser);

//  -- login/out route
router.post('/login', loginUser);
router.post('/logout', logoutUser);

//  -- google routes
router.get('/google', googleAuth);
router.get('/googlecallback', gcallback);

//router.get('/googlecallback?code=')
exports.router = router;
