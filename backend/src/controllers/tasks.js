const jwt = require('jsonwebtoken');

const { createTaskValidation, updateTaskValidation, deleteTaskValidation } = require('../validation/tasks');
const { fetchTasksModel, createTaskModel, updateTaskModel, deleteTaskModel } = require('../model/tasks');

const fetchTasks = async (req, res) => {
    try {
        let { limit, offset,id } = req.query;
        limit = Number(limit);
        offset = Number(offset);
        id = Number(id);
        const results = await fetchTasksModel(limit, offset,id);
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

        const { error, value } = await createTaskValidation.validate({ ...data, user_id: userData.user_id }, { abortEarly: false });
        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
        }
        const results = await createTaskModel(value);
        if (results?.insertResults?.affectedRows >= 1) {
            return res.status(201).json({
                error: false,
                message: "Successfully Created Tasks",
                data: results?.newCreatedTask
            });
        } else {
            return res.status(500).json({
                error: true,
                message: "task was not created",
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

const updateTask = async (req, res) => {
    try {
        const taskToUpdateId = Number(req.params.id);

        const data = req.body;

        const userData = req.user;

        const { error, value } = await updateTaskValidation.validate({ ...data, user_id: userData.user_id, task_id: taskToUpdateId }, { abortEarly: false });
        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
        }
        const results = await updateTaskModel({
            ...value,
            user_id: userData?.user_id
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
            return res.status(404).json({
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
        const { error, value } = await deleteTaskValidation.validate({ ...data }, { abortEarly: false });
        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
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
        } else {
            return res.status(404).json({
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