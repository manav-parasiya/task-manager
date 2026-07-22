const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin : [
        'http://localhost:5173',
        'https://task-manager-gray-eight-43.vercel.app',
        'https://task-manager-production-4c2f.up.railway.app'
    ]
}));

module.exports = app;