// IMPORTS/DECLARATIONS
const collectionsRouter = require('express').Router();
const Room = require('../models/room');
const Collection = require('../models/collection');
const User = require('../models/user');
const token = require('../utils/token');

// ROUTES
// Create Collection
collectionsRouter.post('/create', async (req, res) => {
  const body = req.body;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  console.log(body);

  // Collection uniqueness check across user validation.
  const nameInUse = await Collection.find({uid: verifiedToken.id, name: body.name, roomID: body.roomID});
  if(nameInUse.length > 0){
    return res.status(409).json({error: "Collection name already in use."});
  }

  // Create collection object
  const newCollection = new Collection({
    name: body.name,
    private: body.private,
    keys: body.keys,
    tags: body.tags,
    items: [],
    roomID: body.roomID,
    uid: verifiedToken.id
  })

  const savedCollection = await newCollection.save(); // Save room

  return res.send(savedCollection);
})

// Update single collection.
collectionsRouter.put('/single', async (req, res) => {
  const newName = req.body.name;
  const isPrivate = req.body.private;
  const collectionID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // User already has collection with name
  const nameExists = await Collection.find({
    name: newName,
    uid: verifiedToken.id,
    _id: { $ne: collectionID }
  });

  if(nameExists.length > 0){
    return res.status(409).json({error: "Collection name already exists."});
  }

  const collection = await Collection.findOne({_id: collectionID, uid: verifiedToken.id});

  console.log(collection);
  // Collection does not exist
  if(!collection){
    return res.status(404).json({error: "Collection does not exist."});
  }

  collection.name = newName;
  collection.private = isPrivate;

  await Collection.findByIdAndUpdate(collectionID, collection);

  return res.status(200).json({success: "Collection updated."});
})

// Delete Collection
collectionsRouter.delete('/single', async (req, res) => {
  const collectionID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const collection = await Collection.findById(collectionID);

  if(!collection){ // ROOM DOES NOT EXIST
    return res.status(404).json({error: "Collection does not exist."});
  }else if(collection.uid != verifiedToken.id){ // ROOMS OWNER IS NOT OWNER MAKING REQUEST
    return res.status(403).json({error: "Cannot delete a collection that is not yours."});
  }

  await collection.deleteOne({_id: collection.id}); // Delete collection.

  return res.status(204).json({success: "Successfully deleted collection and all associated Items."});
})

collectionsRouter.get('/search', async (req, res) => {
  const search = req.query.search;
  const roomID = req.query.roomID;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const room = await Room.findById(roomID);

  if(room.private && (verifiedToken.id != room.uid)){
    return res.status(403).json({error: "Collection is private."});
  }

  const collections = await Collection.find({
    name: { $regex: search, $options: 'i' },
    roomID: roomID
  })

  return res.send(collections);
  
})

// GET Collection by ID
collectionsRouter.get('/single', async (req, res) => {
  const collectionID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  var collection = await Collection.findById(collectionID);

  if(!collection){ // Room already doesn't exist.
    return res.status(404).json({error: "Collection does not exist."});
  }else if((collection.uid != verifiedToken.id) && collection.private){ // If room private and not owner don't return room
    return res.status(403).json({error: "Collection is private."})
  }

  return res.json(await Collection.findById(collectionID).populate('items'));
})

// EXPORTS
module.exports = collectionsRouter;
