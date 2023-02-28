const path = require('path');
imageDir = path.join(__dirname,'/../public/images/');

function getMessages(req,res) {
  // res.send('<ul> <li> Hello Albert! </li> </ul>')
  // res.sendFile(imageDir+'images.jpg');
  res.render('messages', {
    title: 'Messages to Friends',
    friend: 'Elon Musk'
  });
};

function postMessages(req,res) {
  console.log('Updating messages...')

};





module.exports = {
  getMessages,
  postMessages
};