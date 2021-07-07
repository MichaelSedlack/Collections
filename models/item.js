const mongoose = require('mongoose');
const Collection = require('./collection');

// Create Schema
const itemSchema = mongoose.Schema({
  name: String,
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
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
  }
})

itemSchema.post('save', async (obj) => {
  // Get collection
  const collection = await Collection.findByID(obj.collectionID);

  // Add item to collection.
  collection.items.push(obj._id);

  // Save Collection
  const savedCollection = await collection.save();

  return;
})

itemSchema.post('deleteOne', {document: true, query: true}, async (obj) => {
  // Get collection that item belongs to
  const collection = await Collection.findById(obj.collectionID);

  // get idx of item
  const idx = collection.items.indexOf(obj._id);

  // remove item from array
  collections.items.splice(idx, 1);

  // Save collection
  const savedCollection = await collection.save();

  return;
})

// Create Item Object
const Item = mongoose.model('Item', itemSchema);

// Export for external use
module.exports = Item;