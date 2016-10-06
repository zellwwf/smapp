var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

mongoose.model('User', userSchema);
exports = userSchema
