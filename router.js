var express = require('express');
var router  = express.Router();
var path    = require("path");
var user   = require('./models/user');
var mongoose    = require('mongoose');
var app = require('./app');
var db = app.db

// sign up routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/signup.html'));
});

router.post('/', function(req, res) {
  var newUser = req.body;
  newUser.createDate = new Date();

  // server side validation
  if (!(req.body.name || req.body.email)) {
    handleError(res, "Sign up error", "Please provide your name and email!", 400);
  }

  // create db user
  var user = db.model('tempUser',user.TempUserSchema);
});

// login routes
router.get('/users', function(req, res) {
  res.sendFile(path.join(__dirname+'/users.html'));
});
module.exports = router;
