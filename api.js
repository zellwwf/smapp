var express     = require('express');
var router      = express.Router();
var path        = require("path");
var googleapi   = require('googleapi');
var pug         = require('pug');
var bcrypt      = require('bcrypt');
var app         = require('./app');
var user        = require('./models/user');

//-------------------------------------------------------------------
// Pages
function registerPage(req,res,next)
{
  res.render('index.pug');
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
  console.log('user logging in...');
  user.checkPassword(req.body.semail,req.body.spassword, login)
  res.redirect('/');
}

function login(err,isMatch) {
  if (isMatch) {
  app.loggedin = true;
  console.log('logged in!');
 }
 else {
   app.loggedin = false;
   console.log('failed to log in!');
 }
}


function logoutUser(req,res,next)
{
  app.loggedin = false;
}

function gcallback(req,res,next)
{

}

function register(userdata)
{
  console.log('registering a user');
  var userModel = app.db.model('User',user.UserSchema);
  var newUser = new userModel(userdata);

  var pass = user.hashPTPassword(newUser.password);
  newUser.password = pass;
  newUser.save();
}

// HTTP ROUTES
//  -- index post route (register)
router.get('/', registerPage);
router.post('/register', registerUser);

//  -- a page that requires authentication (requires login)
router.get('/users', usersPage);

//  -- login/out route
router.post('/login', loginUser);
router.get('/logout', logoutUser);

//  -- google callback route
router.get('/auth/google/callback', gcallback);

exports.router = router;
