var mongoose          = require('mongoose');
var bcrypt            = require('bcrypt');
//-------------------------------------------------------------------

// Create Schemas for Mongoose DB
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleid: String,
    name: String,
    email: String,
    password: String,
});

// Add Schemas to Mongoose Models
var UserModel = mongoose.model('User', UserSchema);

// Define Functions
function checkUserExists(error,email)
{
  console.log('Checking if user: '+ email + ' exists...');
  var found = false;
  UserModel.findOne({email:email}, findcallback);

  return found;
}

function checkPassword(email,prov_password, cb)
{
  //  -- Check if the password provided matches our registered Email
  console.log('Checking submitted password for email ' + email);

  UserModel.findOne({email:email}, function(err,doc)
  {
    bcrypt.compare(prov_password, doc.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  });
}

function hashPTPassword(password)
{
  password.trim();
  console.log('['+password + ']')
  var salt = bcrypt.genSaltSync(10);
  var hashed = bcrypt.hashSync(password, salt);
  console.log('['+hashed + ']')
  return hashed;
}

function findcallback(err, doc, cb){
  if (err) {
    console.log('error in finding user');
    cb(false);
  } else {
    console.log('user found');
    cb(true);
  }
}
exports.userSchema = UserSchema;
exports.checkPassword = checkPassword;
exports.checkUserExists = checkUserExists;
exports.hashPTPassword = hashPTPassword;
