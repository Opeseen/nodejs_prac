const {connection} = require('../database/schema');

function postUser(req,res){
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName.trim() : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName.trim() : false;
  const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length === 10 ? Number(req.body.phone.trim()) : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
  const tosAgreement = req.body.tosAgreement ? req.body.tosAgreement : false;

  if(firstName && lastName && phone && password && tosAgreement){
    console.log('Requests received...')
    const verifyUserPhone = ` SELECT phone FROM users.data WHERE phone = '${phone}' `
    connection.query(verifyUserPhone,(err,result) => {
      if(err) res.send(err);
      if(result.length > 0) res.status(400).send(`User "${phone}" Already Exists...`);
      else{
        if(result.length < 1){
          const insertUsers = `INSERT INTO users.data (firstname,lastname,phone,password,tosAgreement) VALUES('${firstName}', '${lastName}', '${phone}', '${password}', '${tosAgreement}')`;
          connection.query(insertUsers, (err,result,fields) => {
            if(err) res.send(err);
            if(result) res.status(201).json({
              Success: `User ${firstName.toUpperCase()} ${lastName.toUpperCase()} Added Successfully.`
            });
            if(fields) console.log(fields);
          });
          
        };
      };
      
    });
        

  }else{
    res.status(400).json({
      Error: 'Missing Required Parameter'
    });
  }    

}


function loginUser(req,res){
  const phone = typeof(req.query.phone) === 'string' && req.query.phone.trim().length === 10 ? req.query.phone.trim() : false;
  const password = typeof(req.query.password) === 'string' && req.query.password.trim().length > 0 ? req.query.password.trim() : false;

  if(phone && password){
    console.log('Login Information Received');
    const verifyUser = ` SELECT password FROM users.data WHERE phone = '${phone}' `
    connection.query(verifyUser, (err,result) => {
      if(err) res.send(err);
      if(result.length < 1) res.send('Phone Not Found...');
      else{
        db_passwd = result[0].password;
        if(password === db_passwd){
          const showUserData = ` SELECT * FROM users.data WHERE phone = '${phone}' `
          connection.query(showUserData,(err,userData) => {
            if(err) res.status(500).send('Error: Cannot show User Information');
            if(userData){
              delete userData[0].password
              res.send(userData);
            };
          });
        }else{
          res.status(404).json({
            Error: 'Wrong user credentials...'
          })
        }
      };

    });

  }else{
    res.status(400).json({
      Error: 'Missing Required Parameter'
    });
  }
}



module.exports = {
  postUser,
  loginUser
}