const Router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken');

const { register, login, refreshApiToken } = require('../controllers/auth');

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

const notFound = (req,res) => {
    try {
         return res.status(400).json({
            error: true,
            message: "Not Found",
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
Router.post('/refresh',refreshApiToken);
Router.use(verifyToken);
Router.get('/health',health);
Router.use('/tasks',tasks);
Router.use('/',notFound);

module.exports = Router;
