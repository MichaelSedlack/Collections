const mongoose = require('mongoose')
const Room = require('./room');
const Item = require('./item');

// Create Schema
const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  keys: [
    {
      type: String
    }
  ],
  tags: [
    {
    type: String
    }
  ],
  private: {
    type: Boolean,
    required: true
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Item'
    }
  ],
  roomID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Room'
  },
  uid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }
});

// Set options for translation to JSON
collectionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
  }
})

collectionSchema.post('save', async (obj) => {
  // Get room
  const room = await Room.findById(obj.roomID);

  // Add collection to room
  room.collections.push(obj._id);

  // Save collection
  const savedRoom = await room.save();

  return;
})

collectionSchema.post('deleteOne', {document: true, query: false}, async (obj) => {
  // Find associated Room
  const room = await Room.findById(obj.roomID);

  if(!room) return;

  // Find index of id in room
  const idx = room.collections.indexOf(obj._id);

  // Remove id from array
  room.collections.splice(idx, 1);

  // Save Room.
  const savedRoom = await room.save();

  // Delete any and all associated documents.
  await Item.deleteMany({collectionID: obj._id});

  return;
})

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;