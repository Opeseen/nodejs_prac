const express = require('express');
const bodyParser = require('body-parser');
app = express();

const {postUser} = require('./model/postUser')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json())

app.use(bodyParser.json());

PORT = 3000;

app.post('/users',postUser);

app.listen(PORT, () => {
  console.log('App is listening on Port:',PORT);
});

