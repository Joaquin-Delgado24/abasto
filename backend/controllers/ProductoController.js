const Producto = require("../models/producto");
const fs = require('fs');

function registrar(req, res) {
    const data = req.body;
    const producto = new Producto();
    
    producto.titulo = data.titulo;
    producto.descripcion = data.descripcion;
    producto.imagen = req.files?.imagen?.path.split('\\')[1] ?? null;
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

function editar(req, res) {
    const data = req.body;
    const id = req.params.id;
    const img = req.params.img;

    const updateData = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        stock: data.stock,
        idcategoria: data.idcategoria,
        puntos: data.puntos,
        imagen: req.files ? req.files.imagen.path.split('\\')[1] : undefined,
    };

    if (req.files) {
        fs.unlink('./uploads/' + img, (err) => {
            if (err) {
                if(err) throw err;
            }
        });
    }

    Producto.findByIdAndUpdate({ _id: id }, updateData, (err, producto_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if(producto_edit){
                res.status(200).send({producto: producto_edit});
            }else{
                res.status(403).send({message: 'No se edito el producto'});
            }
        }
    });
}

function obtener_producto(req, res) {
    const id = req.params['id'];

    Producto.findOne({_id: id}, (err, producto_data) => {
        if(err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'No existe en el registro'});
            }
        }
    })
}

function eliminar(req, res){
    const id = req.params['id'];

    Producto.findOneAndRemove({_id:id}, (err, producto_delete) => {
        if(err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_delete) {
                res.status(200).send({producto: producto_delete});
            }else{
                res.status(403).send({message: 'No se elimino el producto'});
            }
        }
    })
}

function update_stock(req, res) {
    let id = req.params['id'];
    let data = req.body;

    Producto.findById(id, (err, producto_data) => {
        if(producto_data){
            Producto.findByIdAndUpdate(id, {stock: parseInt(producto_data.stock) + parseInt(data.stock)}, (err, producto_edit) => {
                if(producto_edit){             
                    res.status(200).send({producto: producto_edit});
                }
            })
        }else{
            res.status(500).send(err);
        }
    })
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
}