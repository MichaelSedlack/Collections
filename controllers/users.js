const User = require('../models/user');
const usersRouter = require('express').Router();
const token = require('../utils/token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../utils/config');

// Register User Account
usersRouter.post('/register', async (req, res) => {
  const body = req.body;

  const firstName = (body.firstName) ? body.firstName : "";
  const lastName = (body.lastName) ? body.lastNmae : "";

  const emailExists = await User.find({email: body.email});

  if(emailExists.length > 0){
    return res.status(409).json({error: "Email already in use."});
  }

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
  return res.send(savedUser);
})

// Login endpoint
usersRouter.post('/login', async (req, res) => {
  // Get information from body
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;

  // Search for user in database
  const user = await User.findOne({email});

  // Error checking (incorrect password, or incorrect email)
  if(!user){
    return res.status(400).json({error: "User does not exist"});
  }else if(passwordHash !== user.passwordHash){
    return res.status(400).json({error: "Incorrect Password"});
  }

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

  // Add token and expiration to document and save
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
      + `http://localhost:3000/reset/${resetPasswordToken}\n\n`
      + 'If you did not request to reset your password, please ignore this email and your password will remain unchanged.' 
  }

  // Send Email and retrieve info for email.
  const info = await transporter.sendMail(mailOptions);

  console.log(info);

  // Email not accepted case.
  if(!info.accepted.includes(user.email)){
    return res.status(500).json({error: "Email was not sent."});
  }

  // Email sent fine.
  return res.status(200).json({success: "Recovery email sent."});
})

// Validate reset Token
usersRouter.get('/reset', async (req, res) => {
  const resetToken = req.body.resetToken; // Get Token from body
  const currDate = Date.now(); // Create date now

  const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordExpires: { $gt: currDate }});

  // Token does not exist/is expired case.
  if(!user){
    return res.status(401).json({error: "Token expired or doesn't exist."})
  }

  // Valid token and date.
  return res.send({email: user.email});
})

// Get user by ID
usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
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

module.exports = usersRouter;