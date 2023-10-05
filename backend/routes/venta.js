const express = require('express');
const ventaController = require('../controllers/VentaController');

const api = express.Router();


api.post('/venta/registrar', ventaController.registrar);
api.delete('/venta/eliminar/:id?', ventaController.eliminar);
api.get('/ventas/:usuario?', ventaController.listar_por_usuario);
api.get('/ventas/:cliente?', ventaController.listar_por_cliente);
api.get('/venta/:id', ventaController.obtener_venta);

module.exports = api;