const { off } = require('../config/db');
const fetchTasksModels = require('../model/tasks');

const fetchTasks = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);
        const results = await fetchTasksModels(limit, offset);
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

module.exports = fetchTasks;