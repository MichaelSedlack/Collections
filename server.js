// IMPORTS
require('dotenv').config();
require('express-async-errors');
const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/users');
const roomsRouter = require('./controllers/rooms');

// Variables
const app = express();
const url = process.env.MONGODB_URI;

// Database Connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log(err));

//Initializing Middleware
app.use(cors()); // Allows for cross-origin requests
app.use(bodyParser.json()); // Parses json in request.body for us
app.use('/users', usersRouter); // Users route
app.use('/rooms', roomsRouter); // Rooms route

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build')); // Serves frontend if in production mode
}

// Starts App
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
})
