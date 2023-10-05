var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    idCliente: { type: Schema.ObjectId, ref: "cliente" },
    nombre: String,
    dni: String,
});

module.exports = mongoose.model("cliente_natural", ClienteSchema);
