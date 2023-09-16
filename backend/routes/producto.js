const express = require('express');
const productoController = require('../controllers/ProductoController');
const multipart = require('connect-multiparty');
const path = multipart({uploadDir: './uploads'})

const api = express.Router();


api.post('/producto/registrar', path, productoController.registrar);
api.get('/productos/:titulo?', productoController.listar);
api.put('/productos/editar/:id/:img', path, productoController.editar);
api.get('/producto/registro/:id', productoController.obtener_producto);
api.delete('/producto/:id', productoController.eliminar);
api.put('/producto/stock/:id', productoController.update_stock);
module.exports = api;