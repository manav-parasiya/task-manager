const Router = require('express').Router();

const fetchTasks = require('../controllers/tasks');


Router.get('/',fetchTasks);

module.exports = Router;
