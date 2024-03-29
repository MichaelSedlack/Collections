const User = require('../models/user');
const Room = require('../models/room');
const Collection = require('../models/collection');
const usersRouter = require('express').Router();
const token = require('../utils/token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../utils/config');
const bcrypt = require('bcrypt');
const { truncate } = require('fs');

const saltRounds = 10;

// Register User Account
usersRouter.post('/register', async (req, res) => {
  const body = req.body;

  const firstName = (body.firstName) ? body.firstName : "";
  const lastName = (body.lastName) ? body.lastName : "";
  const passwordHash = await bcrypt.hash(body.password, saltRounds); // ADD HASHING

  const emailExists = await User.find({email: body.email});

  if(emailExists.length > 0){
    return res.status(409).json({error: "Email already in use."});
  }

  const validateToken = crypto.randomBytes(20).toString('hex');

  // Format request into mongoose schema
  const newUser = new User({
    firstName,
    lastName,
    email: body.email,
    passwordHash: passwordHash,
    validateToken,
    validated: false,
    rooms: []
  })

  // Save user
  const savedUser = await newUser.save();

  // Setup email transporter.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: `${config.EMAIL_ADDRESS}`,
      pass: `${config.EMAIL_PASSWORD}`,
    }
  })

  // Sends validation email
  // Setup Email contents.
  const mailOptions = {
    from: 'myuseumapp@gmail.com',
    to: `${savedUser.email}`,
    subject: 'Myuseum email validation.',
    text:
      'You are receiving this because you must validate your account.\n\n'
      + 'Please follow the link provided below, or paste it into your browser to validate your email:\n\n'
      + `${config.BASEURL}validate/${validateToken}\n\n`
      + 'If you did not create this account, ignore this message and the account will not be activated.' 
  }

  // Send Email and retrieve info for email.
  await transporter.sendMail(mailOptions);

  // Send response
  return res.send(savedUser);
})

// Validate email
usersRouter.get('/validate', async (req, res) => {
  const validateToken = req.query.validateToken;

  const user = await User.findOne({validateToken});

  if(!user){
    return res.status(401).send({error: "Validation token invalid"});
  }

  user.validated = true;

  console.log(user);

  await User.findByIdAndUpdate(user._id, user);

  return res.status(200).json({success: "Email successfully validated!"});
})

// Login endpoint
usersRouter.post('/login', async (req, res) => {
  // Get information from body
  const email = req.body.email;
  const password = req.body.password; // ADD HASHING

  // Search for user in database
  const user = await User.findOne({email});

  // Error checking (incorrect password, or incorrect email)
  if(!user){
    return res.status(400).json({error: "User does not exist"});
  }else if(!(await bcrypt.compare(password, user.passwordHash))){ // Check if passwords match
    return res.status(400).json({error: "Incorrect Password"});
  }else if(!user.validated){
     return res.status(403).json({error: "Please validate email."});
   }

  // TODO: UNCOMMENT ABOVE WHEN GOING INTO PRODUCTION

  const newToken = token.createToken(user.firstName, user.lastName, user.id);
  
  const response = {
    accessToken: newToken,
    id: user.id,
    email: user.email
  };

  return res.send(response);
})

// Send recovery email
usersRouter.post('/forgotPassword', async (req, res) => {
  const email = req.body.email;

  // Email is Null case
  if(!email){
    return res.status(400).json({error: "Email required."});
  }

  // Fetch user from database.
  const user = await User.findOne({email: email});

  // User email does not exist Case.
  if(user === null){
    return res.status(404).json({error: "Email does not exist."});
  }

  const resetPasswordToken = crypto.randomBytes(20).toString('hex');

  // Add token and expiration to User document and save
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires= Date.now() + 3600000;
  await user.save({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpires: Date.now() + 3600000,
  });

  // Setup email transporter.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: `${config.EMAIL_ADDRESS}`,
      pass: `${config.EMAIL_PASSWORD}`,
    }
  })

  // Setup Email contents.
  const mailOptions = {
    from: 'myuseumapp@gmail.com',
    to: `${user.email}`,
    subject: 'Myuseum password reset.',
    text:
      'You are receiving this because you have requested to reset the password for your account.\n\n'
      + 'Please follow the link provided below, or paste it into your browser to be taken to the password reset page:\n\n'
      + `${config.BASEURL}reset/${resetPasswordToken}\n\n`
      + 'If you did not request to reset your password, please ignore this email and your password will remain unchanged.' 
  }

  // Send Email and retrieve info for email.
  const info = await transporter.sendMail(mailOptions);

  console.log(info);

  // Email not accepted case.
  if(!info.accepted.includes(user.email)){
    return res.status(503).json({error: "Email was not sent."});
  }

  // Email sent fine.
  return res.status(200).json({success: "Recovery email sent."});
})

// Validate reset Token
usersRouter.get('/reset', async (req, res) => {
  const resetToken = req.query.resetToken; // Get Token from body
  const currDate = Date.now(); // Create date now

  const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordExpires: { $gt: currDate }});

  // Token does not exist/is expired case.
  if(!user){
    return res.status(401).json({error: "Token expired or doesn't exist."})
  }

  // Valid token and date.
  return res.send({email: user.email});
})

// Update password by email.
usersRouter.put('/updatePasswordByEmail', async (req, res) => {
  const email = req.body.email; // Users email
  const password = req.body.password; // Users new Password

  const newPasswordHash = await bcrypt.hash(password, saltRounds); // Hash password

  const user = await User.findOne({email}); // get User document

  // User doesn't exist case
  if(!user){
    return res.status(404).json({error: "User does not exist in db."});
  }

  // Update users information and set reset properties to null.
  user.passwordHash = newPasswordHash;
  user.resetPasswordExpires = null;
  user.resetPasswordToken = null;

  // save user
  const newUser = await user.save();

  return res.status(200).json({success: "Password successfully changed"});
})

// Get user by ID
usersRouter.get('/', async (req, res) => {
  const id = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  if(id === verifiedToken.id){
    const userInfo = await User.findById(id);

    return res.send(userInfo);
  }else{
    const userInfo = await User.findById(id, 'firstName lastName');

    return res.send(userInfo);
  }
})

usersRouter.get('/rooms', async (req,res) => {
  const id = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }
  
  var rooms = null;

  if(id !== verifiedToken.id){
    rooms = await Room.find({uid: id, private: { $ne: false }});

    return res.status(200).json(rooms);
  }

  rooms = await Room.find({uid: id});

  return res.send(rooms);
})

usersRouter.get('/collections', async (req,res) => {
  const id = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }
  
  var rooms = null;

  if(id !== verifiedToken.id){
    rooms = await Collection.find({uid: id, private: { $ne: false }});

    return res.status(200).json(rooms);
  }

  rooms = await Collection.find({uid: id});

  return res.send(rooms);
})

module.exports = usersRouter;
