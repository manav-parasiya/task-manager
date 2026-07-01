const db = require('../config/db');

const fetchTasksModel = async (limit, offset) => {
    const [results] = await db.query(`SELECT * FROM tasks LIMIT ? OFFSET ?`, [limit, offset]);
    return results;
}

const createTaskModel = async (data) => {
    let { user_id, name, description, priority, due_date } = data;
    const [insertResults] = await db.query(`INSERT INTO tasks (user_id,name,description,priority,due_date) values (?,?,?,?,?)`, [user_id, name, description, priority, due_date]);

    const [newCreatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [insertResults?.insertId]);
    return {
        insertResults,
        newCreatedTask
    };
}

const updateTaskModel = async (data) => {
    let { user_id, name, description, priority, due_date, task_id } = data;
    const queryValues = [name, description, priority, due_date, task_id, user_id]
    const query = `
        UPDATE tasks 
        SET name = ?, description = ?, priority = ?, due_date = ?
        WHERE id = ? AND user_id = ?
    `;
    const [updateTaskResults] = await db.query(query, queryValues);

    const [latestTaskResultsAfterUpdate] = await db.query(`SELECT * FROM tasks WHERE id = ?`, [task_id]);

    return {
        updateTaskResults,
        latestTaskResultsAfterUpdate
    };
}


const deleteTaskModel = async (data) => {

    const { task_id, user_id } = data;

    const query = `
        DELETE FROM tasks 
        WHERE id = ? AND user_id = ?
    `;

    const [results] = await db.query(query, [task_id, user_id]);

    return results;
}



module.exports = { fetchTasksModel, createTaskModel, updateTaskModel, deleteTaskModel };