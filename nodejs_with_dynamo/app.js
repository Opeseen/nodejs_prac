const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const {pathNotFoundErrorHandler, errorHandler} = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/api/v1/records/student', studentRoutes);

app.use(pathNotFoundErrorHandler);
app.use(errorHandler);

module.exports = app;

