const Router = require('express').Router();

const { login } = require('../controllers/login');

Router.post('/', login);

module.exports = Router;