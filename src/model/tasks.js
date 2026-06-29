const db = require('../config/db');

const fetchTasksModel = async (limit, offset) => {
    const [results] = await db.query(`SELECT * FROM tasks LIMIT ? OFFSET ?`, [limit, offset]);
    return results;
}

const createTaskModel = async (data) => {
    let { user_id, name, description, priority, due_date } = data;
    const [results] = await db.query(`INSERT INTO tasks (user_id,name,description,priority,due_date) values (?,?,?,?,?)`, [user_id, name, description, priority, due_date]);
    return results;
}

const  updateTaskModel = async (data) => {
    let { user_id, name, description, priority, due_date } = data;

    let dataToUpdateKeys = Object.keys(data);
    let dataToUpdateValues = Object.values(data);
    
    dataToUpdateKeys = dataToUpdateKeys.map(key => `${key} = ?`).join(', ');
    const queryValues = [...Object.values(dataToUpdateValues), name];
    console.log("queryValues ===>",queryValues);
    console.log('dataToUpdate ===>',dataToUpdateKeys);

     const query = `
        UPDATE tasks 
        SET ${dataToUpdateKeys} 
        WHERE name = ?
    `;
    const [results] = await db.query(query, queryValues);
    return results;
}


const deleteTaskModel = async (data) => {
    // 1. Guard clause: Ensure data object contains filtering parameters
    const keys = Object.keys(data);
    if (keys.length === 0) {
        throw new Error("No criteria provided for deleting tasks");
    }

    // 2. Chain parameters with 'AND' instead of commas for safe SQL matching
    const whereClause = keys.map(key => `${key} = ?`).join(' AND ');

    // 3. Keep standard values flatly aligned with array parameters
    const queryValues = Object.values(data);

    // 4. Construct statement with a single, clean WHERE structure
    const query = `
        DELETE FROM tasks 
        WHERE ${whereClause}
    `;

    const [results] = await db.query(query, queryValues);
    return results;
}



module.exports = { fetchTasksModel, createTaskModel,updateTaskModel, deleteTaskModel };