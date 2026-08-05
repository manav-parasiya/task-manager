require('dotenv').config();
const app = require('./app');


const PORT = process.env.PORT;
const pool = require('./src/config/db');


pool.getConnection()
    .then((conn) => {
        console.log(`Database Connected , DB Config: ${(conn.config)}`);
        app.listen(PORT, () => { console.log(`Server is Running on ${PORT} Port`) });
    })
    .catch((err) => console.error(`Error Connecting Database, Error : ${err}`));
