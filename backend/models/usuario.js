var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombres: String,
    apellidos: String,
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("usuario", UserSchema);
