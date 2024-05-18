const express = require('express');
const {errorHandler, pathNotFoundErrorHandler, errorConverter} = require('./middlewares/error');
const {successLogHandler, errorLogHandler} = require('./config/morgan');
const jobRouter = require('./routes/jobRoutes');
const invoiceRouter = require('./routes/invoiceRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json( { limit: '10kb' } ));

// ERROR LOGS
app.use(successLogHandler);
app.use(errorLogHandler);

// ROUTES
app.use('/api/v2/mundial/jobs', jobRouter);
app.use('/api/v2/mundial/invoices', invoiceRouter);
app.use('/api/v2/mundial/payments', paymentRouter);
app.use('/api/v2/mundial/users', userRouter);

// ERROR HANDLER
app.use(pathNotFoundErrorHandler); // ERROR HANDLER FOR PATH NOT FOUND
app.use(errorConverter); // ERROR CONVERTER HANDLER
app.use(errorHandler); // ERROR HANDLER MIDDLEWARES


module.exports = app;
