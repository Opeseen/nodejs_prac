const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const {successLogHandler, errorLogHandler} = require('./config/morgan');
const {pathNotFoundErrorHandler,errorConverter,errorHandler} = require('./middlewares/error');

const app = express();
app.use(express.json());

// ERROR LOGS HANDLER
app.use(successLogHandler);
app.use(errorLogHandler);

app.use('/api/v1/records/student', studentRoutes);

app.use(pathNotFoundErrorHandler);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

