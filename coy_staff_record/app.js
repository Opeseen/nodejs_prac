const express = require('express');
const path = require('path');
const {errorHandler, pathNotFoundErrorHandler, errorConverter} = require('./middlewares/error');
const {successLogHandler, errorLogHandler} = require('./config/morgan');
const staffRouter = require('./routes/userRoutes');

const app = express();

// SET PUG VIEW ENGINE
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER
app.use(express.json( { limit: '10kb' } ));

// ERROR LOGS
app.use(successLogHandler);
app.use(errorLogHandler);

// ROUTES
app.use('/api/v2/mun', staffRouter);


// ERROR HANDLER
app.use(pathNotFoundErrorHandler); // ERROR HANDLER FOR PATH NOT FOUND
app.use(errorConverter); // ERROR CONVERTER HANDLER
app.use(errorHandler); // ERROR HANDLER MIDDLEWARES


module.exports = app;
