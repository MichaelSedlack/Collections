// IMPORTS/DECLARATIONS
const itemRouter = require('express').Router();
const Item = require('../models/item');
//room may not be required, can only access item through collection and nothing else
const Room = require('../models/room');
const Collection = require('../models/collection');
const User = require('../models/user');
const token = require('../utils/token');

// TODO: ROUTES
// blah
// Create Item
itemRouter.post('/create', async (req, res) => {
  const body = req.body;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // Item uniqueness across collection validation.
  const nameInUse = await Item.find({uid: verifiedToken.id, name: body.name,collectionID : body.collectionID, item: body.item});
  if(nameInUse.length > 0){
    return res.status(409).json({error: "Item already in collection."});
  }

  // Create item object
  const newItem = new Item({
    description: body.description,
    //this is prob wrong
    item: body.item,
    collectionID: body.collectionID,
    roomID: body.roomId,
    name: body.name,
    uid: verifiedToken.id
  })

  const savedItem = await newItem.save(); // Save item

  return res.send(savedItem);
})
// GET Item
//TODO: Figure out how to search by given tags
//'/:id'
itemRouter.get('single', async (req, res) => {
  const itemID = req.query.id;
  const collectionID = req.query.collectionID;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const item = await Item.findById(itemID);
  //find collection here to check if its private?

  if(!item){ // Item doesn't exist.
    return res.status(404).json({error: "Cannot delete an item that does not exist."});
//TODO: check if collection is private .
}else if(item.uid != verifiedToken.id){ // If item owner don't return item
    return res.status(403).json({error: "Item is unavailable."})
  }

  return res.json(item);
})


// Update Item
//'/:id'
itemRouter.put('single', async (req, res) => {
  const newName = req.query.name;
  const newDescription = req.query.description;
  const roomID = req.query.roomID;
  const collectionID = req.query.collectionID;
  const itemID = req.query.id;
  //get new tags
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // User already has item with name
  const nameExists = await Item.find({
    name: newName,
    description: newDescription,
    collectionID: collectionID,
    uid: verifiedToken.id,
    _id: { $ne: itemID }
    //TODO: update if item can exist in different collections/rooms
  });

  if(nameExists.length > 0){
    return res.status(409).json({error: "Item name already exists."});
  }

  const item = await Item.findOne({_id: itemID, uid: verifiedToken.id});

  console.log(item);
  // Item does not exist.
  if(!item){
    return res.status(404).json({error: "Item does not exist."});
  }

  item.name = newName;
  item.description = newDescription;
  //add new tags

  await item.save();

  return res.status(200).json({success: "Item updated."});
})

// Delete Item
//'/:id'
itemRouter.delete('single', async (req, res) => {
  const itemID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const item = await Item.findById(itemID);

  if(!item){ // ITEM DOES NOT EXIST
    return res.status(404).json({error: "Item does not exist."});
  }else if(item.uid != verifiedToken.id){ // ITEMS OWNER IS NOT OWNER MAKING REQUEST
    return res.status(403).json({error: "Cannot delete an item that is not yours."});
  }

  await item.deleteOne(); // Delete item.

  return res.status(200).json({success: "Successfully deleted item."});
})

// EXPORTS
module.exports = itemRouter;
