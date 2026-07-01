const Joi = require('joi');

const createTaskValidation = Joi.object({
    user_id: Joi.number().required(),
    name: Joi.string().trim().required(),
    description: Joi.string().trim().optional(),
    priority: Joi.string().trim().valid('low','medium','high').required(),
    due_date: Joi.date().optional()
});

const updateTaskValidation = Joi.object({
    user_id: Joi.number().required(),
    task_id: Joi.number().required(),
    name: Joi.string().trim().required(),
    description: Joi.string().trim().optional(),
    priority: Joi.string().trim().valid('low','medium','high').required(),
    due_date: Joi.date().optional()
});

const deleteTaskValidation = Joi.object({
    user_id: Joi.number().required(),
    task_id: Joi.number().required()
});

module.exports = { createTaskValidation, updateTaskValidation, deleteTaskValidation };