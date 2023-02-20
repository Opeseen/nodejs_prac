const express = require('express');
const bodyParser = require('body-parser');
app = express();
const {postUser,loginUser} = require('./model/userModel')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json())

app.use(bodyParser.json());

PORT = 3000;

app.post('/users',postUser);

app.get('/login',loginUser);

app.listen(PORT, () => {
  console.log('App is listening on Port:',PORT);
});

