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
function checkUserExists(email, cb)
{
  console.log('Checking if user: '+ email + ' exists...');
  var isFound = undefined;

  UserModel.findOne({email:email}, function(err, doc){
    if (err) {
      isFound = false;
      console.log('error:'+ err);
      cb(err, isFound)
    } else {
      isFound = true;
      cb(null, isFound)
    }
  });
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
  var salt = bcrypt.genSaltSync(10);
  var hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

exports.userSchema = UserSchema;
exports.checkPassword = checkPassword;
exports.checkUserExists = checkUserExists;
exports.hashPTPassword = hashPTPassword;
