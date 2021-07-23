// IMPORTS
const config = require('./utils/config');
const path = require('path');
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/users');
const roomsRouter = require('./controllers/rooms');
const collectionsRouter = require('./controllers/collections');
const itemsRouter = require('./controllers/items');
const Grid = require('gridfs-stream'); 

// Variables
const app = express();
const url = config.MONGODB_URI;


// Database Connection
mongoose.connect(url.toString(), {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true
})
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log(err));

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//Initializing Middleware
app.use(cors()); // Allows for cross-origin requests
app.use(express.json()); // Parses json in request.body for us
app.use('/users', usersRouter); // Users route
app.use('/rooms', roomsRouter); // Rooms route
app.use('/collections', collectionsRouter);
app.use('/items', itemsRouter);

// Routes
// - GETS Images from MongoDB
app.get('/images/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        error: 'Not an image'
      });
    }
  });
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });; // Serves frontend if in production mode
}

module.exports = app;