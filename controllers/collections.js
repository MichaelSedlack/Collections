// IMPORTS/DECLARATIONS
const collectionRouter = require('express').Router();
const Room = require('../models/room');
const Collection = require('../models/collection');
const User = require('../models/user');
const token = require('../utils/token');

// ROUTES
// Create Collection
collectionRouter.post('/create', async (req, res) => {
  const body = req.body;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // Collection uniqueness check across user validation.
  const nameInUse = await Collection.find({uid: verifiedToken.id, name: body.name});
  if(nameInUse.length > 0){
    return res.status(409).json({error: "Collection name already in use."});
  }

  // Create collection object
  const newCollection = new Collection({
    name: body.name,
    private: body.private,
    items: [],
    roomID: body.roomID,
    uid: verifiedToken.id
  })

  const savedCollection = await newCollection.save(); // Save room

  return res.send(savedCollection);
})

// Update single collection.
collectionRouter.put('/:id', async (req, res) => {
  const newName = req.body.name;
  const private = req.body.private;
  const roomID = req.params.roomID;
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
  collection.private = private;

  await collection.save();

  return res.status(200).json({success: "Collection updated."});
})

// Delete Collection
collectionRouter.delete('/:id', async (req, res) => {
  const collectionID = req.params.id;
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

  await Collection.deleteOne({_id: collection.id}); // Delete collection.

  return res.status(204).json({success: "Successfully deleted collection and all associated Items."});
})

collectionRouter.get('/search', async (req, res) => {
  const search = req.query.search;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // TODO: Search Logic
})

// GET Collection by ID
collectionRouter.get('/:id', async (req, res) => {
  const collectionID = req.params.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const collection = await Collection.findById(collectionID);

  console.log("UID: " + collection.uid + "  Token: " + verifiedToken.id);

  // If collection private and not owner don't return room
  if((collection.uid != verifiedToken.id) && collection.private){
    return res.status(401).json({error: "Collection is private."})
  }

  return res.json(collection);
})

// EXPORTS
module.exports = collectionRouter;