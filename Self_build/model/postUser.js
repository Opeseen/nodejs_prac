const {connection} = require('../database/schema');

function postUser(req,res){
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName.trim() : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName.trim() : false;
  const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length === 10 ? req.body.phone.trim() : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
  const tosAgreement = req.body.tosAgreement ? req.body.tosAgreement : false;

  if(firstName && lastName && phone && password && tosAgreement){
    console.log('Requests received...')
    const insertUsers = `INSERT INTO  users.data (firstname,lastname,phone,password,tosAgreement) VALUES('${firstName}', '${lastName}', '${phone}', '${password}', '${tosAgreement}')` ;
    connection.query(insertUsers, (err,result,fields) => {
      if(err) res.send(err);
      if(result) res.json(result);
      if(fields) console.log(fields);
    });    

  }else{
    res.status(400).json({
      Error: 'Missing Required Parameter'
    });
  }    

}

module.exports = {
  postUser
}