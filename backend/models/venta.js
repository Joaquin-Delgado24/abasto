var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idUsuario: Number,//{ type: Schema.ObjectId, ref: "usuario" },
    idCliente: Number,//{ type: Schema.ObjectId, ref: "cliente" },
    fecha: { type: Date, default: Date.now },
    importe: Number,
    impuesto: Number,
});

module.exports = mongoose.model("venta", VentaSchema);
