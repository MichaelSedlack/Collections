// IMPORTS
const config = require('./utils/config');
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/users');
const roomsRouter = require('./controllers/rooms');

// Variables
const app = express();
const url = config.MONGODB_URI;


// Database Connection
mongoose.connect(url.toString(), {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log(err));

//Initializing Middleware
app.use(cors()); // Allows for cross-origin requests
app.use(express.json()); // Parses json in request.body for us
app.use('/users', usersRouter); // Users route
app.use('/rooms', roomsRouter); // Rooms route

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build')); // Serves frontend if in production mode
}

module.exports = app;