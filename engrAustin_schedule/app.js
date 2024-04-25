const express = require('express');
const {errorHandler, pathNotFoundErrorHandler, errorConverter} = require('./middlewares/error');
const {successLogHandler, errorLogHandler} = require('./config/morgan');
const jobRouter = require('./routes/jobRoutes');

const app = express();

app.use(express.json( { limit: '10kb' } ));

// ERROR LOGS
app.use(successLogHandler);
app.use(errorLogHandler);

// ROUTES
app.use('/api/v2/mundial/jobs', jobRouter);

// ERROR HANDLER
app.use(pathNotFoundErrorHandler); // ERROR HANDLER FOR PATH NOT FOUND
app.use(errorConverter); // ERROR CONVERTER HANDLER
app.use(errorHandler); // ERROR HANDLER MIDDLEWARES


module.exports = app;
