const Router = require('express').Router();

const { fetchTasks, createTasks, updateTask, deleteTask } = require('../controllers/tasks');

Router.get('/', fetchTasks);
Router.post('/', createTasks);
Router.put('/', updateTask);
Router.delete('/', deleteTask);

module.exports = Router;
