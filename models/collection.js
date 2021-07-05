const mongoose = require('mongoose')

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

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;