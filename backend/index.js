const express = require("express");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

const pool = require('./src/config/db');
const middlewares = require('./src/middlewares/index');
const routes = require('./src/routes/index');

app.use('/', middlewares);
app.use('/v1/api', routes);

pool.getConnection()
    .then((conn) => {
        console.log(`Database Connected , DB Config: ${(conn.config)}`);
        app.listen(PORT, () => { console.log(`Server is Running on ${PORT} Port`) });
    })
    .catch((err) => console.error(`Error Connecting Database, Error : ${err}`));
