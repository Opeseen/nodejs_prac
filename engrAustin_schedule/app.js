const express = require('express');

const app = express();

// ROUTES
app.use('/', (req, res) => {
  res.status(200).send('Hello Austin')
});



module.exports = app;
