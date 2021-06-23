// IMPORTS
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//Initializing Middleware
app.use(cors()); // Allows for cross-origin requests
app.use(bodyParser.json()); // Parses json in request.body for us

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build')); // Serves frontend if in production mode
}

// Starts App
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
})
