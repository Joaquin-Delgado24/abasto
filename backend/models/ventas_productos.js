var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
    idVenta: { type: Schema.ObjectId, ref: "venta"},
    idProducto: { type: Schema.ObjectId, ref: "producto" },
    cantidad: Number,
    subtotal: Number,
});

module.exports = mongoose.model("ventas_productos", DetalleVentaSchema);
