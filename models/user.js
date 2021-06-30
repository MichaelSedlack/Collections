const mongoose = require('mongoose');

// Lay out Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  rooms: [
    {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Room'
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

// Set options for translation to JSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.resetPasswordToken
      delete returnedObject.resetPasswordExpires
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
  }
})

// Create user 'object'
const User = mongoose.model('User', userSchema);

// Exporting for outside use.
module.exports = User;