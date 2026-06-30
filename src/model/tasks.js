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

    const { task_id, user_id } = data;

    const query = `
        DELETE FROM tasks 
        WHERE id = ? AND user_id = ?
    `;

    const [results] = await db.query(query, [task_id,user_id]);

    return results;
}



module.exports = { fetchTasksModel, createTaskModel,updateTaskModel, deleteTaskModel };