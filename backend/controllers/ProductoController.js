const Producto = require("../models/producto");
var fs = require('fs');



function registrar(req, res) {
    const data = req.body;
    const producto = new Producto();

    console.log(req);

    producto.titulo = data.titulo;
    producto.descripcion = data.descripcion;
    producto.imagen = (req.files?.imagen?.path.split('\\')[1] ?? req.files?.imagen?.path.split('\\')[2]) ?? null;
    producto.precio_compra = data.precio_compra;
    producto.precio_venta = data.precio_venta;
    producto.stock = data.stock;
    producto.idCategoria = data.idCategoria;
    producto.puntos = data.puntos;

    producto.save((err, producto_save) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (producto_save) {
                res.status(200).send({ producto: producto_save });
            } else {
                res.status(403).send({ message: 'No se registró el producto' });
            }
        }
    });
}

function listar(req, res) {
    var titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i') }, (err, productos_listado) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (productos_listado) {
                res.status(200).send({ productos: productos_listado });
            } else {
                res.status(403).send({ message: "No hay ningún producto ese titulo" });
            }
        }
    });

    console.log('res: ', res);
}

function editar(req, res) {
    var id = req.params["id"];
    var data = req.body;

    var imagen_name = null;

    if (req.files) {

        imagen_name = (req.files.imagen.path.split('\\')[1] ?? req.files?.imagen?.path.split('\\')[2]) ?? null;
    }
    Producto.findByIdAndUpdate(
        { _id: id },
        {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idCategoria: data.idcategoria,
            puntos: data.puntos
        },
        (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: "Error en el servidor" });
            } else {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit });
                    // eliminar imagen anterior
                    var img = producto_edit.imagen;
                    if (img != null) {
                        fs.unlink('./uploads/' + img, (err) => {
                            if (err) throw err;
                        });
                    }
                } else {
                    res.status(403).send({ message: "El producto no se pudo actualizar" });
                }
            }
        }
    );
}

function eliminar(req, res) {
    var id = req.params["id"];

    Producto.findByIdAndRemove({ _id: id }, (err, producto_delete) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (producto_delete) {
                res.status(200).send({ producto: producto_delete });
                // eliminar imagen anterior
                var img = producto_delete.imagen;
                if (img != null) {
                    fs.unlink('./uploads/' + img, (err) => {
                        if (err) throw err;
                    });
                }
            } else {
                res.status(403).send({ message: "El producto no se pudo eliminar" });
            }
        }
    });
}

function obtener_producto(req, res) {
    var id = req.params["id"];

    Producto.findById({ _id: id }, (err, producto_data) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (producto_data) {
                res.status(200).send({ categoria: producto_data });
            } else {
                res.status(403).send({ message: "El producto no existe" });
            }
        }
    });
}

module.exports = {
    registrar,
    listar,
    obtener_producto,
    editar,
    eliminar,
}