require('dotenv').config();
const http = require('http');
const logger = require('./config/logger');

const app = require('./app');

const httpServer = http.createServer(app); 

const port = process.env.PORT || 3000;

const server = httpServer.listen(port, () => {
  logger.info(`Dynamo Server Is Listening on port ${port}`);
});
