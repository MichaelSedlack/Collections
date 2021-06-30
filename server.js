// IMPORTS
const app = require('./app'); // the actual Express application
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app)
const PORT = config.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})