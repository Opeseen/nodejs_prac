const express = require('express');
const handlers = require('./lib/handlers');
const app = express();
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const PORT = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.use(express.json());


app.get('/', (req, res) => {
  handlers.index((statusCode,finalOutput) => {
    res.status(statusCode).send(finalOutput);
  });
});

app.get('/users/login', (req,res) => {
  res.sendFile(__dirname + '/templates/sessionLogin.html');
});

app.get('/users/create',(req,res) => {
  res.sendFile(__dirname + '/templates/accountCreate.html');
});



app.post('/userCreated',userController.postUsers);
app.get('/users/info',userController.getUsers);


app.listen(PORT, () => {
  console.log('App is listening on Port',PORT);
});