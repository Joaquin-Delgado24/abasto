const express = require('express');
const userController = require('../controllers/UserController');

const api = express.Router();

api.post('/user/registrar', userController.registrar);
api.post('/user/login', userController.login);
api.get('/user/listar', userController.listar);

module.exports = api;
