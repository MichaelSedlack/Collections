const User = require('../models/user');
const usersRouter = require('express').Router()
const token = require('../utils/token');

usersRouter.post('/register', async (req, res) => {
  const body = req.body;

  const firstName = (body.firstName) ? body.firstName : "";
  const lastName = (body.lastName) ? body.lastNmae : "";

  // Format request into mongoose schema
  const newUser = new User({
    firstName,
    lastName,
    email: body.email,
    passwordHash: body.passwordHash,
    rooms: []
  })

  // Save user
  const savedUser = await newUser.save();

  // Send response
  res.send(savedUser);
})

usersRouter.post('/login', async (req, res) => {
  // Get information from body
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;

  // Search for user in database
  const user = await User.findOne({email});

  // Error checking (incorrect password, or incorrect email)
  if(!user){
    res.status(400).json({error: "User does not exist"});
  }else if(passwordHash !== user.passwordHash){
    res.status(400).json({error: "Incorrect Password"});
  }

  const newToken = await token.createToken(user.firstName, user.lastName, user.id);
  
  const response = {
    accessToken: newToken,
    id: user.id,
    email: user.email
  };

  res.send(response);
})

usersRouter.get('/:id', async (req, res) => {
  console.log("Getting user by ID");
})

module.exports = usersRouter;