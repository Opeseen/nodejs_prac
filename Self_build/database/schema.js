const db = require('mysql');
const config = require('./config');


const connection = db.createConnection({
  host: config.credentials.host,
  user: config.credentials.user,
  password: config.credentials.password
})



connection.query('CREATE DATABASE IF NOT EXISTS users;')
connection.query('USE users;');
const createTable = "CREATE TABLE IF NOT EXISTS data (ID int NOT NULL AUTO_INCREMENT, firstname varchar(15), lastname varchar(15), phone varchar(15), password varchar(10), tosAgreement varchar(8), PRIMARY KEY(ID))";
connection.query(createTable, (err,result) => {
  if(err) throw err;
  console.log('Table Created')

});


module.exports = {
  connection,
}

