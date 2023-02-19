const _data = require('../lib/data');

function postUsers(req,res){
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName.trim() : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName.trim() : false;
  const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length === 10 ? req.body.phone.trim() : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
  const tosAgreement = req.body.tosAgreement ? req.body.tosAgreement : false;

  if(firstName && lastName && phone && password && tosAgreement){
    userObject = {
      firstName:firstName,
      lastName:lastName,
      phone:phone,
      password:password,
      tosAgreement:tosAgreement
    };
    _data.create('user',phone,userObject,(err) => {
      if(!err){
        res.status(200).json({
          Success: "User Created"
        });  
      }else{
        res.status(400).send(err)
      };
      
    });
  }else{
    res.status(400).json({
      Error: 'Missing Required Parameter'
    });
  };
};


function getUsers(req,res){
  // Check that the phone number is valid. 
  const phone = typeof(req.query.phone) === 'string' && req.query.phone.trim().length === 10 ? req.query.phone.trim() : false;
  const password = typeof(req.query.password) === 'string' && req.query.password.trim().length > 0 ? req.query.password.trim() : false;
  if(phone && password){
    verifyUser(phone,password,(statusCode,passwordIsValid) => {
      if(statusCode == 200 && passwordIsValid){
        _data.read('user',phone,(err,data) => {
          if(!err && data){
            delete data.password
            res.status(200).json(data);
          }else{
            res.status(500).json({
              Error: "Internal Error"
            });
          };
        });

      }else{
        res.status(400).json({
          Error: "Incorrect Password or Phone"
        });
      };

    });
  

  }else{
    res.status(400).json({
      Error: 'Missing Phone or Password Parameter'
    });

  };

};

function verifyUser(phone,password,callback){
  // LookUp the user
  _data.read('user',phone,(err,userData) => {
    if(!err && userData){
      // Verify thet the password entered is correct
      if(userData.password == password){
        callback(200, true);
      }else{
        callback(404, false);
      }
    }else{
      callback(500, false);
    }
  });
};

module.exports = {
  postUsers,
  getUsers
}
