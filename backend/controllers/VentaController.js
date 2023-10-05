const Venta = require("../models/venta");
const fs = require('fs');
const Ventas_Productos = require("../models/ventas_productos");



function registrar(req, res) {
    const data = req.body;
    const venta = new Venta();
    
    venta.idUsuario = data.idUsuario;
    venta.idCliente = data.idCliente;
    venta.importe = data.importe;
    venta.impuesto = venta.importe;// * 0.18;
    console.log(req);
    venta.save((err, venta_save) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (venta_save) {
                res.status(200).send({ venta: venta_save });
            } else {
                res.status(403).send({ message: 'No se registró la venta' });
            }
        }
    });
}

function listar(req, res) {
    const titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo, 'i')}, (err, producto_listado) => {
        if(err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_listado){
                res.status(200).send({productos: producto_listado});
            }else{
                res.status(403).send({message: 'No hay ningun registro con ese titulo'});
            }
        }
    })
}

function listar_por_usuario(req, res) {
    var _idUsuario = req.params['idUsuario'];

    Venta.find({idUsuario: _idUsuario}, (err, venta_listado) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (venta_listado) {
                res.status(200).send({ ventas: venta_listado });
            } else {
                res.status(403).send({ message: "No hay ninguna venta por parte de ese usuario" });
            }
        }
    });

    console.log('res: ', res);
}

function listar_por_cliente(req, res) {
    var _idCliente = req.params['idUsuario'];

    Venta.find({ idCliente: _idCliente }, (err, venta_listado) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (venta_listado) {
                res.status(200).send({ ventas: venta_listado });
            } else {
                res.status(403).send({ message: "No hay ninguna venta por parte de ese cliente" });
            }
        }
    });

    console.log('res: ', res);
}

function eliminar(req, res) {
    var id = req.params["id"];

    Venta.findByIdAndRemove({ _id: id }, (err, venta_delete) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (venta_delete) {
                res.status(200).send({ venta: venta_delete });
            } else {
                res.status(403).send({ message: "La venta no se pudo eliminar" });
            }
        }
    });
}

function obtener_venta(req, res) {
    var id = req.params["id"];

    Venta.findById({ _id: id }, (err, venta_data) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (venta_data) {
                //Listar los productos de la venta
                Ventas_Productos.find({ idVenta: venta_data.idVenta }, (err, vp_data) => {
                    if (err) {
                        res.status(500).send({ message: "Error en el servidor" });
                    } else {
                        if (vp_data) {
                            res.status(200).send({ venta: venta_data, productos: vp_data});
                        } else {
                            res.status(200).send({ venta: venta_data });
                        }
                    }
                });
            } else {
                res.status(403).send({ message: "La venta no existe" });
            }
        }
    });
}

module.exports = {
    registrar,
    listar_por_usuario,
    listar_por_cliente,
    obtener_venta,
    eliminar,
}