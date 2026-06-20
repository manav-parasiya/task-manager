const Router = require('express').Router();

const { register } = require('../controllers/login');

Router.post('/', register);

module.exports = Router; 
