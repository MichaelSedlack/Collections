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

  // Item uniqueness across user validation.
  //TODO: Decide if the same item can exist in different collections (Remember to delete from all collections)
  //TODO: Figure out how to check based on tags
  //For Now: Will throw an error if the item exists anywhere in the museum already
  const nameInUse = await Item.find({uid: verifiedToken.id, name: body.name});
  if(nameInUse.length > 0){
    return res.status(409).json({error: "Item already in museum."});
  }

  // Create item object
  const newItem = new Item({
    description: body.description,
    //this is prob wrong
    item: [],
    collectionID: body.collectionID,
    roomID: body.roomId,
    //name: body.name,
    uid: verifiedToken.id
  })

  const savedItem = await newItem.save(); // Save item

  return res.send(savedItem);
})
// GET Item
//TODO: Figure out how to search by given tags
itemRouter.get('/:id', async (req, res) => {
  const itemID = req.params.id;
  //const collectionID = req.params
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const item = await Item.findById(itemID);

  if(!item){ // Item already doesn't exist.
    return res.status(404).json({error: "Cannot delete an item that does not exist."});
//TODO: check if this is even necessary.
  }else if(item.uid != verifiedToken.id){ // If item owner don't return item
    return res.status(403).json({error: "Item is unavailable."})
  }

  return res.json(item);
})


// Update Item
itemRouter.put('/:id', async (req, res) => {
  //const newName = req.body.name;
  const newDescription = req.body.description;
  const roomID = req.params.roomID;
  const collectionID = req.params.collectionID;
  const itemID = req.params.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // User already has item with name
  const nameExists = await Item.find({
    //name: newName,
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

  //item.name = newName;

  await item.save();

  return res.status(200).json({success: "Item updated."});
})

// Delete Item
itemRouter.delete('/:id', async (req, res) => {
  const itemID = req.params.id;
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
