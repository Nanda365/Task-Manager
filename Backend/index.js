require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Task Manager Backend API');
});

const taskRoutes = require('./Routes/tasks');
const auditRoutes = require('./Routes/audit');
app.use('/api/tasks', taskRoutes);
app.use('/api/audit-logs', auditRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
