const Router = require('express').Router();


const login = require('./login');
const register = require('./register');

Router.use('/login',login);
Router.use('/register',register);


module.exports = Router;
