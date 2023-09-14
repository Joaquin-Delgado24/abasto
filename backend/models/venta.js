var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VentaSchema = Schema({
  idCliente: { type: Schema.ObjectId, ref: "cliente" },
  idUser: { type: Schema.ObjectId, ref: "user" },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("venta", VentaSchema);
