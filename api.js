var express = require('express');
var router  = express.Router();
var path    = require("path");
var mongoose    = require('mongoose');
var googleapi = require('googleapi');
var app = require('./app');
var user   = require('./models/user');
var tempUser = require('./models/tempUser');
var nev = require('email-verification')(mongoose);
var jwt    = require('jsonwebtoken');

nev.configure({
    verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
    persistentUserModel: user,
    tempUserModel: tempUser,
    tempUserCollection: 'myawesomewebsite_tempusers',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'zellwwf@gmail.com',
            pass: 'aXaXaX112211'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <zellwwf@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});

nev.confirmTempUser(url, function(err, user) {
    if (err)
        // handle error...

    // user was found!
    if (user) {
        // optional
        nev.sendConfirmationEmail(user['email_field_name'], function(err, info) {
            // redirect to their profile...
        });
    }

    // user's data probably expired...
    else
        // redirect to sign-up
});

nev.generateTempUserModel(tempUser);

// sign up routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/signup.html'));
});

router.post('/', function(req, res) {
  // create db user
  var userModel = app.db.model('TempUser',user.TempUserSchema);
  var newUser = new userModel(req.body);

  newUser.save(function(err)
  {
    if (err) console.log('error saving');
    else {
      console.log('user saved');
    }
});

nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
    // some sort of error
    if (err)
        // handle error...

    // user already exists in persistent collection...
    if (existingPersistentUser)
        // handle user's existence... violently.

    // a new user
    if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err)
                // handle error...

            // flash message of success
        });

    // user already exists in temporary collection...
    } else {
        // flash message of failure...
    }
});
  //redirect to verify email page
  res.redirect(200,'/');
});

// login routes
router.get('/api', function(req, res) {
  res.sendFile(path.join(__dirname+'/users.html'));
});
module.exports = router
