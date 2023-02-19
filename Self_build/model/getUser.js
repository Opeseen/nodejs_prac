const {connection} = require('../database/schema');

function getuser(req,res){
  const selectUsers = "SELECT * from data ORDER BY phone LIMIT 5"
  connection.query(selectUsers,(err,result) => {
    if(err) res.send(err);
    if(result) res.send(result);
  });

};


module.exports = {
  getuser
}