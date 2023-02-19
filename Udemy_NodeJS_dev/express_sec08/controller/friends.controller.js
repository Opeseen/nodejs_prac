const model = require('../models/friends.model');

function postFriends(req,res){
  if (!req.body.name){
    return res.status(400).json({
      Error: "Missing friend name parameter"
    });
  }
  const newFriend = {
    Name: req.body.name,
    id: model.length
  };
  model.push(newFriend);
};

function getFriends(req,res){
  res.json(model);
};

function getFriend(req,res){
  const friendID = Number(req.params.friendID);
  const friend = model[friendID];
  if(friend){
    res.json(friend);
  }else{
    res.status(404).json({Error: 'Friends does not exist'})
  }
};


module.exports = {
  postFriends,
  getFriend,
  getFriends
}