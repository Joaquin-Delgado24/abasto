var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarcaSchema = Schema({
  nombre: String,
  descripcion: String,
});

module.exports = mongoose.model("marca", MarcaSchema);
