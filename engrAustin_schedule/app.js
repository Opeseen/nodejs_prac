const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {errorHandler, pathNotFoundErrorHandler, errorConverter} = require('./middlewares/error');
const {successLogHandler, errorLogHandler} = require('./config/morgan');
const jobRouter = require('./routes/jobRoutes');
const invoiceRouter = require('./routes/invoiceRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewsRoutes');


const app = express();

// SET PUG VIEW ENGINE
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER
app.use(express.json( { limit: '10kb' } ));
app.use(cookieParser());

// ERROR LOGS
app.use(successLogHandler);
app.use(errorLogHandler);

// ROUTES
app.use('/', viewRouter);
app.use('/api/v2/mundial/jobs', jobRouter);
app.use('/api/v2/mundial/invoices', invoiceRouter);
app.use('/api/v2/mundial/payments', paymentRouter);
app.use('/api/v2/mundial/users', userRouter);

// ERROR HANDLER
app.use(pathNotFoundErrorHandler); // ERROR HANDLER FOR PATH NOT FOUND
app.use(errorConverter); // ERROR CONVERTER HANDLER
app.use(errorHandler); // ERROR HANDLER MIDDLEWARES


module.exports = app;
