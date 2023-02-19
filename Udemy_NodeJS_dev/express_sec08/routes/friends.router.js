const express = require('express');
const friendsController = require('../controller/friends.controller');
const friendsRouter = express.Router();

friendsRouter.use((req,res,next) =>{
  console.log(`Ip addresses: ${req.ip}`);
  next();
});
friendsRouter.post('/',friendsController.postFriends);
friendsRouter.get('/',friendsController.getFriends);
friendsRouter.get('/:friendID',friendsController.getFriend);


module.exports = friendsRouter;