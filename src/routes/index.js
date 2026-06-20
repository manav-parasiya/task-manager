const Router = require('express').Router();

const login = require('./login');


Router.use('/',login);


module.exports = Router;
