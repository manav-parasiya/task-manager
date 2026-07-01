const jwt = require('jsonwebtoken');

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
        const data = req.body;

        const userData = req.user;
        const results = await createTaskModel({ ...data, user_id: userData.user_id });
        return res.status(201).json({
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
        const taskToUpdateId = Number(req.params.id);

        const data = req.body;

        const userData = req.user;
        const results = await updateTaskModel({
            ...data,
            user_id: userData?.user_id,
            task_id: taskToUpdateId
        });
        if (results?.updateTaskResults?.affectedRows >= 1) {
            return res.status(200).json({
                error: false,
                message: "Task Updated Successfully",
                data: {
                    task: results?.latestTaskResultsAfterUpdate
                }
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Task not found",
                data: []
            });
        }
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
        const userData = req.user;
        const taskToDeleteId = Number(req.params.id);

        const data = {
            task_id: taskToDeleteId,
            user_id: userData?.user_id
        }
        const results = await deleteTaskModel(data);
        if (results?.affectedRows >= 1) {
            return res.status(200).json({
                error: false,
                message: "Task Deleted Successfully",
                data: {
                    task_id: taskToDeleteId
                }
            });
        }else{
            return res.status(400).json({
                error: true,
                message: "Task not found",
                data: []
            })
        }
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