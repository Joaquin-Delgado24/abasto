const Producto = require("../models/producto");

function registrar(req, res) {
    const data = req.body;
    const producto = new Producto();
    
    producto.titulo = data.titulo;
    producto.descripcion = data.descripcion;
    producto.imagen = req.files?.imagen?.path.split('\\')[2] ?? null;
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
    console.log('res: ', res);
}

function editar(req, res) {

    const data = req.body;
    const id = req.params['id'];

    if(req.files){
        const image_path = req.files.imagen.path;
        const name = image_path.split('\\');
        const imagen_name = name[2];

        Producto.findByIdAndUpdate({_id: id},{titulo: data.titulo, descripcion: data.descripcion, imagen: imagen_name,
        precio_compra: data.precio_compra, precio_venta: data.precio_venta, stock: data.stock, idcategoria: data.idcategoria,
        puntos: data.puntos}, (err, producto_edit) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se edito el producto'});
                }
            }
        })
    }else{
        Producto.findByIdAndUpdate({_id: id},{titulo: data.titulo, descripcion: data.descripcion,
        precio_compra: data.precio_compra, precio_venta: data.precio_venta, stock: data.stock, idcategoria: data.idcategoria,
        puntos: data.puntos}, (err, producto_edit) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se edito el producto'});
                }
            }
        })
    }
}


module.exports = {
    registrar,
    listar,
    editar,
}