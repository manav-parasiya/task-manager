const Router = require('express').Router();

const { register, login } = require('../controllers/login');

Router.post('/login', login);
Router.use('/register',register);

module.exports = Router;