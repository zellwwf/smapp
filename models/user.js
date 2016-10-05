var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'UserSchema', new Schema({
    name: String,
    email: String,
    password: String,
  }),
  'TempUserSchema', new Schema({
    name: String,
    email: String,
    password: String,
  })
);

var sendVerification = function(err, fluffy) {
  if (err) return console.error(err);
};
