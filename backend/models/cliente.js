var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  nombres: String,
  puntos: Number,
});

module.exports = mongoose.model("cliente", ClienteSchema);
