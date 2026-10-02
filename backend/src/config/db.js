const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: process.env.DB_CA_CERT ? { 
        ca:process.env.DB_CA_CERT
    } : undefined
});

module.exports = pool;