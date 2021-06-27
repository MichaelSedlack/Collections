const mongoose = require('mongoose');

// Create Schema
const itemSchema = mongoose.Schema({
  description: String,
  item: Object,
  collectionID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Collection'
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Room'
  },
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

// Create Item Object
const Item = mongoose.model('Item', itemSchema);

// Export for external use
module.exports = Item;