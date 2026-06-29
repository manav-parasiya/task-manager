const { fetchTasksModel, createTaskModel, updateTaskModel, deleteTaskModel } = require('../model/tasks');

const fetchTasks = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);
        const results = await fetchTasksModel(limit, offset);
        return res.status(200).json({
            error: false,
            message: "Successfully Fetched Tasks",
            data: results
        });

    } catch (error) {
        console.error('Error ===>', error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const createTasks = async (req, res) => {
    try {

        let data = {
            user_id,
            name,
            description,
            priority,
            due_date
        } = req.body;
        const results = await createTaskModel(data);
        return res.status(200).json({
            error: false,
            message: "Successfully Created Tasks",
            data: results
        });

    } catch (error) {
        console.error('Error ===>', error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const updateTask = async (req, res) => {
    try {

        let data = {
            user_id,
            name,
            description,
            priority,
            due_date
        } = req.body;
        const results = await updateTaskModel(data);
        return res.status(200).json({
            error: false,
            message: "Updated Fetched Tasks",
            data: {
                task_id: results
            }
        });

    } catch (error) {
        console.error('Error ===>', error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const deleteTask = async (req, res) => {
    try {

        let data = {
            user_id,
            name,
            id
        } = req.body;
        const results = await deleteTaskModel(data);
        return res.status(200).json({
            error: false,
            message: "Task Deleted Succesfully",
            data: {
                task_id: results
            }
        });

    } catch (error) {
        console.error('Error ===>', error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

module.exports = { fetchTasks, createTasks, updateTask, deleteTask };