const mongoose          = require('mongoose');
const bcrypt            = require('bcrypt');
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
function checkUserExists(email, userdata, cb)
{
  console.log('Checking if user: '+ email + ' exists...');
  UserModel.findOne({email:email}, function(err, doc){
    if (err) {
      console.log('ERROR');
    } else {
      if (doc == null) {
        console.log('User not found');
        cb(userdata)
      } else {
        console.log('User already exists! Please sign in');
      }
    }
  });
}

function checkPassword(email,prov_password, cb)
{
  //  -- Check if the password provided matches our registered Email
  console.log('Checking submitted password for email ' + email);

  UserModel.findOne({email:email}, function(err,doc)
  {
    if (err || doc == null) {
      console.log('error');
    }
    else
    {
      console.log('no error');
      bcrypt.compare(prov_password, doc.password, function(err, isMatch) {
        cb(null, isMatch);
    });
    }
  });
}

function hashPTPassword(password)
{
  password.trim();
  var salt = bcrypt.genSaltSync(10);
  var hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

exports.userSchema = UserSchema;
exports.checkPassword = checkPassword;
exports.checkUserExists = checkUserExists;
exports.hashPTPassword = hashPTPassword;
