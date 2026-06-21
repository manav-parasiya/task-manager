const pool = require('../config/db');

const addUser = async (data) => {
        const result = await pool.query(`INSERT INTO USERS (name,email,password,role_id) values (?,?,?,?)`, [data.name, data.email, data.hashedPassword, data.role_id]);

        return result;
}

const getUserByEmail = async (email) => {
        const result = await pool.query(`SELECT * FROM USERS WHERE email = '${email}' `);

        return result
}

module.exports = {addUser,getUserByEmail};