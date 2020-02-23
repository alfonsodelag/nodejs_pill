const http = require('http');
const app = require('./app');
require('dotenv').config()
const port = process.env.PORT || 3000;


http.createServer(app.handleRequest).listen(port);