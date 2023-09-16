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

module.exports = {
    registrar,
    listar,
}