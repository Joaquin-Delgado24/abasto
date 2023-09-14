var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
  idProducto: { type: Schema.ObjectId, ref: "producto" },
  cantidad: Number,
});

module.exports = mongoose.model("detalleventa", DetalleVentaSchema);
