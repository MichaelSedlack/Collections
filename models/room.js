const mongoose = require('mongoose');
const User = require('./user');

// Lay out Schema
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    required: true
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Collection'
    }
  ],
  uid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }
})

// Set options for translation to JSON
roomSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
  }
})

roomSchema.post('save', async (obj) => {
  // Grab user
  const user = await User.findById(obj.uid);

  // Add current room to users rooms array.
  user.rooms.push(obj._id);
  
  // Save user
  const savedUser = await user.save();
  
  return;
})

// Create Room 'object'
const Room = mongoose.model('Room', roomSchema);

// Exporting for outside use.
module.exports = Room;