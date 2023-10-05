var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    idCliente: { type: Schema.ObjectId, ref: "cliente" },
    razon_social: String,
    ruc: String,
});

module.exports = mongoose.model("cliente_juridico", ClienteSchema);
