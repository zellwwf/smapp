var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TempUserSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

mongoose.model('TempUser', TempUserSchema);

exports = TempUserSchema
