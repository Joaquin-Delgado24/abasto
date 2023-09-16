const express = require('express');
const productoController = require('../controllers/ProductoController');
const multipart = require('connect-multiparty');
const path = multipart({uploadDir: './uploads'})

const api = express.Router();


api.post('/producto/registrar', path, productoController.registrar);
//api.get('/productos/:titulo', productoController.listar);
api.put('/productos/editar/:id?', path, productoController.editar);

module.exports = api;