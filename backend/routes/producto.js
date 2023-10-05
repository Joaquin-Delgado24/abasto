const express = require('express');
const productoController = require('../controllers/ProductoController');
const multipart = require('connect-multiparty');
const path = multipart({uploadDir: './uploads'})

const api = express.Router();


api.post('/producto/registrar', path, productoController.registrar);
api.post('/producto/editar/:id?', path, productoController.editar);
api.delete('/producto/eliminar/:id?', productoController.eliminar);
api.get('/productos/:titulo?', productoController.listar);
api.get('/producto/:id', productoController.obtener_producto);

module.exports = api;