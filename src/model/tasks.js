const db = require('../config/db');

const fetchTasksModels = async(limit,offset) =>{
    const [results] = await db.query(`SELECT * FROM tasks LIMIT ? OFFSET ?`,[limit,offset]);
    return results;
}

module.exports = fetchTasksModels;