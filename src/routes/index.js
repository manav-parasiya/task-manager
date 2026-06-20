const Router = require('express').Router();

const { register, login } = require('../controllers/auth');

Router.post('/login', login);
Router.post('/register',register);


module.exports = Router;
