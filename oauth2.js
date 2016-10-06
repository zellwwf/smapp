var passport = require('passport');
var config = require('./config');
var GoogleStrategy require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: config.get('OAUTH2_CLIENT_ID'),
  clientSecret: config.get('OAUTH2_CLIENT_SECRET'),
  callbackURL: config.get('OAUTH2_CALLBACK'),
  accessType: 'offline'
}, function (accessToken, refreshToken, profile, cb) {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
