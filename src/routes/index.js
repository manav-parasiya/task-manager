const Router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken');

const { register, login } = require('../controllers/auth');

const tasks = require('./tasks');

const health = (req,res) => {
    try {
         return res.status(200).json({
            error: false,
            message: "Health OK",
            data: []
        });
    } catch (error) {
         return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}
Router.post('/login', login);
Router.post('/register',register);
Router.use(verifyToken);
Router.get('/health',health);
Router.use('/tasks',tasks);

module.exports = Router;
