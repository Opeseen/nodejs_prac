const express = require('express');
const messagesController = require('../controller/messages.controller');
const messagesRouter = express.Router();

messagesRouter.post('/',messagesController.postMessages);
messagesRouter.get('/',messagesController.getMessages);

module.exports = messagesRouter;