const express = require("express");
const app = express();

const middlewares = require('./src/middlewares/index');
const routes = require('./src/routes/index');

app.use('/', middlewares);
app.use('/v1/api', routes);

module.exports = app;