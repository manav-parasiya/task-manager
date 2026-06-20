const express = require("express");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

const middlewares = require('./src/middlewares/index');
const routes = require('./src/routes/index');

app.use('/',middlewares);
app.use('/v1/api',routes);

app.listen(PORT,() => { console.log(`Server is Running on ${PORT} Port`)});